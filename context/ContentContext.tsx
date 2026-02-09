import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppConfig, ThemeConfig } from '../types';
import { defaultAppConfig } from '../defaultData';
import { applyTheme } from './ThemeContext';
import { api } from '../services/api';

interface ContentContextType {
    content: AppConfig;
    isLoading: boolean;
    error: string | null;
    updateContent: (newContent: AppConfig) => void;
    updateSection: <K extends keyof AppConfig['screens']>(section: K, data: Partial<AppConfig['screens'][K]>) => Promise<void>;
    updateTheme: (data: Partial<ThemeConfig>) => Promise<void>;
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
        try {
            setIsLoading(true);
            const [screensData, settingsData] = await Promise.all([
                api.getAllScreens(),
                api.getSettings()
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
                screens: { ...defaultAppConfig.screens, ...screens }
            };

            setContent(newContent);
            applyTheme(theme);
            setError(null);
        } catch (err) {
            console.error("Failed to load content:", err);
            setError("Failed to load content from server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Global Replace (Client-side mainly, or push to all?)
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

        try {
            // We need to send the FULL data for that screen + the update
            const currentScreenData = content.screens[section];
            const updatedScreenData = { ...currentScreenData, ...data };
            await api.updateScreen(section as string, updatedScreenData);
        } catch (err) {
            console.error("Failed to update section:", err);
            // Revert? For now just log
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

        // Map theme back to settings keys
        const settingsToUpdate: any = {};
        if (data.primaryColor) settingsToUpdate.primaryColor = data.primaryColor;
        if (data.secondaryColor) settingsToUpdate.secondaryColor = data.secondaryColor;
        if (data.backgroundColor) settingsToUpdate.backgroundColor = data.backgroundColor;
        if (data.textColor) settingsToUpdate.textColor = data.textColor;
        if (data.fontFamily) settingsToUpdate.fontFamily = data.fontFamily;
        if (data.buttonStyle) settingsToUpdate.buttonStyle = data.buttonStyle;

        try {
            await fetch('http://localhost:3001/api/settings', { // TODO: add api.updateSettings in future
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsToUpdate)
            });
        } catch (err) {
            console.error("Failed to update theme:", err);
        }
    };

    // CRUD for Arrays
    const createItem = async (section: keyof AppConfig['screens'], arrayName: string, item: any) => {
        // Optimistic
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

        const sectionData = content.screens[section] as any;
        const list = sectionData[arrayName] || [];
        const newList = [...list, item];
        const updatedScreenData = { ...sectionData, [arrayName]: newList };
        await api.updateScreen(section as string, updatedScreenData);
    };

    const updateItem = async (section: keyof AppConfig['screens'], arrayName: string, itemId: string, data: any) => {
        // Optimistic
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

        const sectionData = content.screens[section] as any;
        const list = sectionData[arrayName] || [];
        newList = list.map((item: any) => item.id === itemId ? { ...item, ...data } : item);
        const updatedScreenData = { ...sectionData, [arrayName]: newList };
        await api.updateScreen(section as string, updatedScreenData);
    };

    const deleteItem = async (section: keyof AppConfig['screens'], arrayName: string, itemId: string) => {
        // Optimistic
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

        const sectionData = content.screens[section] as any;
        const list = sectionData[arrayName] || [];
        newList = list.filter((item: any) => item.id !== itemId);
        const updatedScreenData = { ...sectionData, [arrayName]: newList };
        await api.updateScreen(section as string, updatedScreenData);
    };

    const resetToDefaults = () => {
        if (window.confirm("This will reset LOCAL state. Backend reset not implemented yet.")) {
            setContent(defaultAppConfig);
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
