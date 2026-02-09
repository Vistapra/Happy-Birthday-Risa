import React from 'react';

interface AudioPlayerProps {
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, setIsPlaying }) => {
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
                   <iframe 
                        width="1" 
                        height="1" 
                        src="https://www.youtube.com/embed/e4XwTNGhFVE?autoplay=1&loop=1&playlist=e4XwTNGhFVE" 
                        title="YouTube audio" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;