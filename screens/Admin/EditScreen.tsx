import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import ImagePicker from '../../components/ImagePicker';

const EditScreen: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [screenData, setScreenData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (slug) loadScreen(slug);
    }, [slug]);

    const loadScreen = async (slug: string) => {
        try {
            const data = await api.getScreen(slug);
            setScreenData(data);
        } catch (error) {
            console.error('Failed to load screen:', error);
            alert('Failed to load screen data');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!slug || !screenData) return;
        setSaving(true);
        try {
            await api.updateScreen(slug, screenData.data);
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Failed to save:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (path: string[], value: any) => {
        setScreenData((prev: any) => {
            const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
            let current = newData.data;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return newData;
        });
    };

    const handleArrayAdd = (path: string[], template: any) => {
        setScreenData((prev: any) => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData.data;
            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }
            if (Array.isArray(current)) {
                // Generate new ID if generic template has one
                const item = { ...template };
                if (item.id === '') item.id = 'item_' + Date.now();
                current.push(item);
            }
            return newData;
        });
    };

    const handleArrayRemove = (path: string[], index: number) => {
        setScreenData((prev: any) => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData.data;
            for (let i = 0; i < path.length; i++) {
                current = current[path[i]];
            }
            if (Array.isArray(current)) {
                current.splice(index, 1);
            }
            return newData;
        });
    };

    // Recursive Field Renderer
    const renderFields = (data: any, path: string[] = []) => {
        if (typeof data !== 'object' || data === null) return null;

        return Object.keys(data).map((key) => {
            const value = data[key];
            const currentPath = [...path, key];
            const fieldLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            // 1. Strings
            if (typeof value === 'string') {
                // Image URL detection (basic)
                if (key.toLowerCase().includes('image') || key.toLowerCase().includes('icon') && value.includes('/') || key === 'avatar') {
                    return (
                        <div key={key} className="mb-4">
                            <ImagePicker
                                label={fieldLabel}
                                currentImage={value}
                                onImageSelected={(url) => handleChange(currentPath, url)}
                            />
                        </div>
                    );
                }

                // Color detection
                if (key.toLowerCase().includes('color') || (value.startsWith('#') && value.length <= 9)) {
                    return (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{fieldLabel}</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={value}
                                    onChange={(e) => handleChange(currentPath, e.target.value)}
                                    className="h-10 w-16 p-1 rounded border border-gray-300 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleChange(currentPath, e.target.value)}
                                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none uppercase"
                                />
                            </div>
                        </div>
                    );
                }

                // Long text detection
                if (value.length > 50 || key.toLowerCase().includes('message') || key.toLowerCase().includes('description')) {
                    return (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{fieldLabel}</label>
                            <textarea
                                value={value}
                                onChange={(e) => handleChange(currentPath, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[100px]"
                            />
                        </div>
                    );
                }

                // Default Text Input
                return (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{fieldLabel}</label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(currentPath, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>
                );
            }

            // 2. Arrays (Memories, Highlights, etc.)
            if (Array.isArray(value)) {
                return (
                    <div key={key} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">{fieldLabel} List</h3>
                            <button
                                onClick={() => handleArrayAdd(currentPath, getTemplate(value))}
                                className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">add</span> Add Item
                            </button>
                        </div>
                        <div className="space-y-4">
                            {value.map((item, index) => (
                                <div key={index} className="p-4 bg-white rounded shadow-sm border border-gray-100 relative group">
                                    <button
                                        onClick={() => handleArrayRemove(currentPath, index)}
                                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove Item"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                    <div className="pr-8">
                                        {/* Recursive call for array items */}
                                        {renderFields(item, [...currentPath, index.toString()])}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }

            // 3. Nested Objects
            return (
                <div key={key} className="mb-4 pl-4 border-l-2 border-gray-200">
                    <h4 className="text-md font-semibold text-gray-600 mb-2 uppercase tracking-wider text-xs">{fieldLabel}</h4>
                    {renderFields(value, currentPath)}
                </div>
            );
        });
    };

    const getTemplate = (arr: any[]) => {
        if (arr.length > 0) {
            const template = JSON.parse(JSON.stringify(arr[0]));
            // Clear values
            Object.keys(template).forEach(k => {
                if (typeof template[k] === 'string') template[k] = '';
                if (k === 'id') template[k] = '';
            });
            return template;
        }
        // Fallback templates if empty
        return { id: '', text: '' };
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="text-gray-500 hover:text-gray-900 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900 capitalize">
                            Edit {slug?.replace(/([A-Z])/g, ' $1')}
                        </h1>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? (
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : (
                            <span className="material-symbols-outlined text-sm">save</span>
                        )}
                        Save Changes
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-3xl w-full mx-auto p-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {screenData && screenData.data && renderFields(screenData.data)}
                </div>
            </main>
        </div>
    );
};

export default EditScreen;
