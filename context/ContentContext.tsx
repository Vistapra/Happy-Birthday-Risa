import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, ThemeConfig } from '../types';
import { defaultAppConfig } from '../defaultData';
import { applyTheme } from './ThemeContext';

// Check if API URL is configured (only in local dev with backend)
const API_URL = import.meta.env.VITE_API_URL || '';
const USE_API = !!API_URL;

// Dynamic API helpers — only used when USE_API is true
const apiCall = {
    getAllScreens: async () => {
        const response = await fetch(`${API_URL}/screens`);
        if (!response.ok) throw new Error('Failed to fetch screens');
        return response.json();
    },
    getSettings: async () => {
        const response = await fetch(`${API_URL}/settings`);
        if (!response.ok) throw new Error('Failed to fetch settings');
        return response.json();
    },
    updateScreen: async (slug: string, data: any) => {
        const response = await fetch(`${API_URL}/screens/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        });
        if (!response.ok) throw new Error('Failed to update screen');
        return response.json();
    },
    updateSettings: async (settings: Record<string, any>) => {
        const response = await fetch(`${API_URL}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings),
        });
        if (!response.ok) throw new Error('Failed to update settings');
        return response.json();
    },
};

interface ContentContextType {
    content: AppConfig;
    isLoading: boolean;
    error: string | null;
    updateContent: (newContent: AppConfig) => void;
    updateSection: <K extends keyof AppConfig['screens']>(section: K, data: Partial<AppConfig['screens'][K]>) => Promise<void>;
    updateTheme: (data: Partial<ThemeConfig>) => Promise<void>;
    updateGlobalSettings: (settings: Record<string, any>) => Promise<void>;
    createItem: (section: keyof AppConfig['screens'], arrayName: string, item: any) => Promise<void>;
    updateItem: (section: keyof AppConfig['screens'], arrayName: string, itemId: string, data: any) => Promise<void>;
    deleteItem: (section: keyof AppConfig['screens'], arrayName: string, itemId: string) => Promise<void>;
    resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<AppConfig>(defaultAppConfig);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        // --- STATIC MODE (Production / Vercel) ---
        // No backend needed, use defaultAppConfig directly
        if (!USE_API) {
            setContent(defaultAppConfig);
            applyTheme(defaultAppConfig.theme);
            setIsLoading(false);
            return;
        }

        // --- API MODE (Local dev with backend) ---
        try {
            setIsLoading(true);
            const [screensData, settingsData] = await Promise.all([
                apiCall.getAllScreens(),
                apiCall.getSettings()
            ]);

            const screens = screensData.reduce((acc: any, screen: any) => {
                acc[screen.slug] = screen.data;
                return acc;
            }, {});

            const theme: ThemeConfig = {
                primaryColor: settingsData.primaryColor || defaultAppConfig.theme.primaryColor,
                secondaryColor: settingsData.secondaryColor || defaultAppConfig.theme.secondaryColor,
                backgroundColor: settingsData.backgroundColor || defaultAppConfig.theme.backgroundColor,
                textColor: settingsData.textColor || defaultAppConfig.theme.textColor,
                fontFamily: settingsData.fontFamily || defaultAppConfig.theme.fontFamily,
                buttonStyle: settingsData.buttonStyle || defaultAppConfig.theme.buttonStyle,
            };

            const newContent: AppConfig = {
                recipientName: settingsData.recipientName || defaultAppConfig.recipientName,
                theme,
                screens: { ...defaultAppConfig.screens, ...screens },
                musicUrl: settingsData.musicUrl || defaultAppConfig.musicUrl
            };

            setContent(newContent);
            applyTheme(theme);
            setError(null);
        } catch (err) {
            console.error("Failed to load content from API, falling back to defaults:", err);
            // Fallback to default data instead of showing error
            setContent(defaultAppConfig);
            applyTheme(defaultAppConfig.theme);
            setError(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Global Replace
    const updateContent = (newContent: AppConfig) => {
        setContent(newContent);
    };

    // Section Update
    const updateSection = async <K extends keyof AppConfig['screens']>(section: K, data: Partial<AppConfig['screens'][K]>) => {
        // Optimistic Update
        setContent(prev => ({
            ...prev,
            screens: {
                ...prev.screens,
                [section]: {
                    ...prev.screens[section],
                    ...data
                }
            }
        }));

        if (USE_API) {
            try {
                const currentScreenData = content.screens[section];
                const updatedScreenData = { ...currentScreenData, ...data };
                await apiCall.updateScreen(section as string, updatedScreenData);
            } catch (err) {
                console.error("Failed to update section:", err);
            }
        }
    };

    // Theme Update
    const updateTheme = async (data: Partial<ThemeConfig>) => {
        setContent(prev => ({
            ...prev,
            theme: {
                ...prev.theme,
                ...data
            }
        }));

        if (USE_API) {
            const settingsToUpdate: any = {};
            if (data.primaryColor) settingsToUpdate.primaryColor = data.primaryColor;
            if (data.secondaryColor) settingsToUpdate.secondaryColor = data.secondaryColor;
            if (data.backgroundColor) settingsToUpdate.backgroundColor = data.backgroundColor;
            if (data.textColor) settingsToUpdate.textColor = data.textColor;
            if (data.fontFamily) settingsToUpdate.fontFamily = data.fontFamily;
            if (data.buttonStyle) settingsToUpdate.buttonStyle = data.buttonStyle;

            try {
                await apiCall.updateSettings(settingsToUpdate);
            } catch (err) {
                console.error("Failed to update theme:", err);
            }
        }
    };

    // Global Settings Update (e.g. music, name)
    const updateGlobalSettings = async (settings: Record<string, any>) => {
        setContent(prev => ({
            ...prev,
            ...settings
        }));

        if (USE_API) {
            try {
                await apiCall.updateSettings(settings);
            } catch (err) {
                console.error("Failed to update settings:", err);
            }
        }
    };

    // CRUD for Arrays
    const createItem = async (section: keyof AppConfig['screens'], arrayName: string, item: any) => {
        setContent(prev => {
            const sectionData = prev.screens[section] as any;
            const list = sectionData[arrayName] || [];
            return {
                ...prev,
                screens: {
                    ...prev.screens,
                    [section]: {
                        ...sectionData,
                        [arrayName]: [...list, item]
                    }
                }
            };
        });

        if (USE_API) {
            const sectionData = content.screens[section] as any;
            const list = sectionData[arrayName] || [];
            const newList = [...list, item];
            const updatedScreenData = { ...sectionData, [arrayName]: newList };
            await apiCall.updateScreen(section as string, updatedScreenData);
        }
    };

    const updateItem = async (section: keyof AppConfig['screens'], arrayName: string, itemId: string, data: any) => {
        let newList: any[] = [];
        setContent(prev => {
            const sectionData = prev.screens[section] as any;
            const list = sectionData[arrayName] || [];
            newList = list.map((item: any) => item.id === itemId ? { ...item, ...data } : item);
            return {
                ...prev,
                screens: {
                    ...prev.screens,
                    [section]: {
                        ...sectionData,
                        [arrayName]: newList
                    }
                }
            };
        });

        if (USE_API) {
            const sectionData = content.screens[section] as any;
            const list = sectionData[arrayName] || [];
            newList = list.map((item: any) => item.id === itemId ? { ...item, ...data } : item);
            const updatedScreenData = { ...sectionData, [arrayName]: newList };
            await apiCall.updateScreen(section as string, updatedScreenData);
        }
    };

    const deleteItem = async (section: keyof AppConfig['screens'], arrayName: string, itemId: string) => {
        let newList: any[] = [];
        setContent(prev => {
            const sectionData = prev.screens[section] as any;
            const list = sectionData[arrayName] || [];
            newList = list.filter((item: any) => item.id !== itemId);
            return {
                ...prev,
                screens: {
                    ...prev.screens,
                    [section]: {
                        ...sectionData,
                        [arrayName]: newList
                    }
                }
            };
        });

        if (USE_API) {
            const sectionData = content.screens[section] as any;
            const list = sectionData[arrayName] || [];
            newList = list.filter((item: any) => item.id !== itemId);
            const updatedScreenData = { ...sectionData, [arrayName]: newList };
            await apiCall.updateScreen(section as string, updatedScreenData);
        }
    };

    const resetToDefaults = () => {
        if (window.confirm("This will reset content to defaults.")) {
            setContent(defaultAppConfig);
            applyTheme(defaultAppConfig.theme);
        }
    };

    return (
        <ContentContext.Provider value={{
            content,
            isLoading,
            error,
            updateContent,
            updateSection,
            updateTheme,
            updateGlobalSettings,
            createItem,
            updateItem,
            deleteItem,
            resetToDefaults
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
