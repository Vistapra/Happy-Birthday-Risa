import React, { useState } from 'react';
import EditOverlay from './EditOverlay';
import { useContent } from '../../context/ContentContext';

interface AdminControlsProps {
    currentScreen: string;
    data: any;
}

const AdminControls: React.FC<AdminControlsProps> = ({ currentScreen, data }) => {
    const { content, resetToDefaults } = useContent();
    const [editingTarget, setEditingTarget] = useState<'screen' | 'theme' | null>(null);

    const toggleEditScreen = () => {
        setEditingTarget(editingTarget === 'screen' ? null : 'screen');
    };

    const toggleEditTheme = () => {
        setEditingTarget(editingTarget === 'theme' ? null : 'theme');
    };

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {(editingTarget !== null) && (
                    <button
                        onClick={resetToDefaults}
                        className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 mb-2"
                        title="Reset All Data"
                    >
                        <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                    </button>
                )}

                <button
                    onClick={toggleEditTheme}
                    className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 mb-1 ${editingTarget === 'theme' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700'}`}
                    title="Edit Theme"
                >
                    <span className="material-symbols-outlined text-[20px]">palette</span>
                </button>

                <button
                    onClick={toggleEditScreen}
                    className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${editingTarget === 'screen' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    title="Edit Current Screen"
                >
                    <span className="material-symbols-outlined text-[24px]">
                        {editingTarget === 'screen' ? 'edit_off' : 'edit'}
                    </span>
                </button>
            </div>

            {/* Overlay */}
            {editingTarget && (
                <EditOverlay
                    screenName={editingTarget === 'theme' ? 'Theme' : currentScreen}
                    data={editingTarget === 'theme' ? content.theme : data}
                    onClose={() => setEditingTarget(null)}
                />
            )}
        </>
    );
};

export default AdminControls;
