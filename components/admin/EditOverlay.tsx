import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ScreenName } from '../../types';

interface EditOverlayProps {
    screenName: string; // key of AppConfig['screens']
    data: any;
    onClose: () => void;
}

const EditOverlay: React.FC<EditOverlayProps> = ({ screenName, data, onClose }) => {
    const { updateSection, createItem, updateItem, deleteItem, updateTheme } = useContent();
    const [localData, setLocalData] = useState(data);

    // Helper to handle simple field updates
    const handleChange = (field: string, value: string | number) => {
        const newData = { ...localData, [field]: value };
        setLocalData(newData);
        // Auto-save to context on valid change? Or wait for save button?
        // User asked for "Save" button in AdminControls, but here we might want "Live Preview" 
        // For now, let's update context immediately for "Live Editing" feel, or we can add a Save button here.
        // The user requirement said "Tombol: Save" in AdminControls. 
        // Let's implement immediate update for preview, and "Reset" is available globally.
        // Actually, updateSection commits to state which commits to localStorage.
        // So "Save" is effectively automatic. 
        // But if we want a "Cancel" feature, we need local state buffering.

        // DECISION: Detailed requirement said "UpdateSection" etc.
        // Let's call updateSection directly for instant feedback.
        if (screenName === 'Theme') {
            updateTheme({ [field]: value } as any);
        } else {
            updateSection(screenName as any, { [field]: value });
        }
    };

    const renderField = (key: string, value: any) => {
        if (typeof value === 'string') {
            if (value.length > 50 || key.includes('message') || key.includes('wish') || key.includes('Bit')) {
                return (
                    <div key={key} className="mb-4">
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{key}</label>
                        <textarea
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-2 border rounded bg-white text-black text-sm"
                            rows={3}
                        />
                    </div>
                );
            }
            return (
                <div key={key} className="mb-4">
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">{key}</label>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-full p-2 border rounded bg-white text-black text-sm"
                    />
                </div>
            );
        }
        return null;
    };

    // Detect Arrays (like memories, paragraphs)
    const renderArrayControls = () => {
        return Object.keys(data).map(key => {
            if (Array.isArray(data[key])) {
                return (
                    <div key={key} className="mt-6 border-t pt-4">
                        <h3 className="font-bold text-lg mb-2 capitalize">{key} List</h3>
                        {data[key].map((item: any, index: number) => (
                            <div key={item.id} className="p-3 bg-gray-100 rounded mb-2 flex flex-col gap-2 relative group">
                                <span className="text-xs font-mono text-gray-400">ID: {item.id}</span>
                                {/* Render inputs for item fields */}
                                {Object.keys(item).map(itemKey => {
                                    if (itemKey === 'id') return null;
                                    return (
                                        <div key={itemKey}>
                                            <label className="text-[10px] uppercase font-bold text-gray-500">{itemKey}</label>
                                            {itemKey.length > 50 || itemKey === 'description' || itemKey === 'text' || itemKey === 'message' ? (
                                                <textarea
                                                    value={item[itemKey]}
                                                    onChange={(e) => updateItem(screenName as any, key, item.id, { [itemKey]: e.target.value })}
                                                    className="w-full p-1 border rounded text-xs"
                                                    rows={2}
                                                />
                                            ) : (
                                                <input
                                                    value={item[itemKey]}
                                                    onChange={(e) => updateItem(screenName as any, key, item.id, { [itemKey]: e.target.value })}
                                                    className="w-full p-1 border rounded text-xs"
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                                <button
                                    onClick={() => {
                                        if (window.confirm('Delete this item?')) deleteItem(screenName as any, key, item.id);
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                const newId = Math.random().toString(36).substr(2, 9);
                                let template: any = { id: newId };

                                // Define templates based on key
                                if (key === 'paragraphs') {
                                    template = { id: newId, text: "New paragraph text..." };
                                } else if (key === 'memories') {
                                    template = {
                                        id: newId,
                                        title: "New Memory",
                                        description: "Description...",
                                        image: "https://via.placeholder.com/150",
                                        date: "2024",
                                        icon: "event"
                                    };
                                } else if (key === 'highlights') {
                                    template = {
                                        id: newId,
                                        title: "New Highlight",
                                        description: "Description...",
                                        icon: "star",
                                        color: "#D4AF37"
                                    };
                                } else {
                                    // Fallback: try to copy structure of first item if exists
                                    if (data[key].length > 0) {
                                        template = { ...data[key][0], id: newId };
                                        Object.keys(template).forEach(k => { if (k !== 'id') template[k] = "New Content" });
                                    } else {
                                        template = { id: newId, text: "New Item" };
                                    }
                                }

                                createItem(screenName as any, key, template);
                            }}
                            className="w-full py-2 bg-blue-500 text-white rounded mt-2 hover:bg-blue-600 font-bold text-sm"
                        >
                            + Add {key} Item
                        </button>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto p-4 border-l border-gray-200 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-gray-800">Edit {screenName}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="text-xs text-gray-400 mb-2 italic">Changes save automatically</div>

                {Object.keys(data).map(key => {
                    if (!Array.isArray(data[key])) {
                        return renderField(key, data[key]);
                    }
                    return null;
                })}

                {renderArrayControls()}
            </div>
        </div>
    );
};

export default EditOverlay;
