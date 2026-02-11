import React from 'react';
import { useContent } from '../context/ContentContext';

interface AudioPlayerProps {
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
    const { content } = useContent();
    const musicUrl = content?.musicUrl || "https://www.youtube.com/embed/e4XwTNGhFVE?autoplay=1&loop=1&playlist=e4XwTNGhFVE";

    const getEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Check if it's already an embed URL
            let embedUrl = url;
            if (url.includes('watch?v=')) {
                const videoId = url.split('v=')[1]?.split('&')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (url.includes('youtu.be/')) {
                const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }

            // Add parameters if not present
            const hasQueryParams = embedUrl.includes('?');
            const separator = hasQueryParams ? '&' : '?';

            // Extract video ID for playlist looping
            let videoId = '';
            if (embedUrl.includes('/embed/')) {
                videoId = embedUrl.split('/embed/')[1]?.split('?')[0];
            }

            let newUrl = embedUrl;
            if (!newUrl.includes('autoplay=')) newUrl += `${separator}autoplay=1`;
            if (!newUrl.includes('loop=')) newUrl += `&loop=1`;
            if (!newUrl.includes('playlist=') && videoId) newUrl += `&playlist=${videoId}`;

            return newUrl;
        }
        return url;
    };

    return (
        <div className="fixed bottom-4 right-4 z-[100]">
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isPlaying ? 'bg-primary text-white animate-spin-slow' : 'bg-white text-primary'}`}
                style={{ animationDuration: '3s' }}
            >
                <span className="material-symbols-outlined">
                    {isPlaying ? 'music_note' : 'play_arrow'}
                </span>
            </button>

            {isPlaying && (
                <div className="hidden">
                    {musicUrl.includes('youtube.com') || musicUrl.includes('youtu.be') ? (
                        <iframe
                            width="1"
                            height="1"
                            src={getEmbedUrl(musicUrl)}
                            title="YouTube audio"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <video // Using video tag to support both mp3 and mp4 (audio only)
                            src={musicUrl}
                            autoPlay
                            loop
                            playsInline
                            controls={false}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;