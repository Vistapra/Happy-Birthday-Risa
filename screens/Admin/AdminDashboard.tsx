import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useContent } from '../../context/ContentContext';

const AdminDashboard: React.FC = () => {
    const { content, updateGlobalSettings } = useContent();
    const [screens, setScreens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [musicUrl, setMusicUrl] = useState('');

    useEffect(() => {
        loadScreens();
    }, []);

    useEffect(() => {
        if (content?.musicUrl) {
            setMusicUrl(content.musicUrl);
        }
    }, [content]);

    const loadScreens = async () => {
        try {
            const data = await api.getAllScreens();
            setScreens(data);
        } catch (error) {
            console.error('Failed to load screens:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async () => {
        await updateGlobalSettings({ musicUrl });
        alert('Global settings saved!');
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link to="/" className="text-primary hover:text-primary-dark font-medium flex items-center gap-1">
                        View Site <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                </div>

                {/* Global Settings Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">settings</span>
                        Global Settings
                    </h2>
                    <div className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Background Music URL (YouTube Embed)
                            </label>
                            <input
                                type="text"
                                value={musicUrl}
                                onChange={(e) => setMusicUrl(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
                                placeholder="https://www.youtube.com/embed/..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Make sure to include <code>autoplay=1</code> in the parameters if you want it to auto-play.
                            </p>
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-sm active:scale-95 transform duration-150 h-[42px]"
                        >
                            Save
                        </button>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Or Upload Music File (MP3/MP4)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept="audio/mp3,audio/mpeg,video/mp4"
                                onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        try {
                                            const file = e.target.files[0];
                                            const response = await api.uploadFile(file);
                                            setMusicUrl(response.url);
                                            alert('File uploaded successfully! Click Save to apply.');
                                        } catch (error) {
                                            console.error('Upload failed', error);
                                            alert('Failed to upload file');
                                        }
                                    }
                                }}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20
                                cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {screens.map((screen) => (
                        <Link
                            key={screen.slug}
                            to={`/admin/edit/${screen.slug}`}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">
                                        {screen.slug === 'giftBox' ? 'redeem' :
                                            screen.slug === 'memories' ? 'photo_library' :
                                                screen.slug === 'highlight' ? 'star' : 'web_asset'}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">{screen.type}</span>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 capitalize mb-1">
                                {screen.slug.replace(/([A-Z])/g, ' $1').trim()}
                            </h2>
                            <p className="text-sm text-gray-500">Manage content for {screen.slug} screen</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
