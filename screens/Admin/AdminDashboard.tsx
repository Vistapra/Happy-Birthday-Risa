import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const AdminDashboard: React.FC = () => {
    const [screens, setScreens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadScreens();
    }, []);

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
