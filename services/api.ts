import { ScreenName } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
    getScreen: async (slug: string) => {
        const response = await fetch(`${API_URL}/screens/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch screen');
        return response.json();
    },

    getAllScreens: async () => {
        const response = await fetch(`${API_URL}/screens`);
        if (!response.ok) throw new Error('Failed to fetch screens');
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

    getSettings: async () => {
        const response = await fetch(`${API_URL}/settings`);
        if (!response.ok) throw new Error('Failed to fetch settings');
        return response.json();
    },

    uploadImage: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Failed to upload image');
        return response.json();
    },

    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_URL}/upload/file`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) throw new Error('Failed to upload file');
        return response.json();
    }
};
