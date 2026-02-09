import React, { useState, useRef } from 'react';
import { api } from '../services/api';

interface ImagePickerProps {
    label: string;
    currentImage: string;
    onImageSelected: (url: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ label, currentImage, onImageSelected }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const { url } = await api.uploadImage(file);
            onImageSelected(url);
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                    {currentImage ? (
                        <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                            <span className="material-symbols-outlined">image</span>
                        </div>
                    )}
                    {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Choose Image'}
                    </button>
                    <p className="text-xs text-gray-500">Supported: JPG, PNG, GIF</p>
                </div>
            </div>
        </div>
    );
};

export default ImagePicker;
