import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';
import Preloader from '../screens/Preloader';
import OpeningScreen from '../screens/OpeningScreen';
import GreetingScreen from '../screens/GreetingScreen';
import MessageScreen from '../screens/MessageScreen';
import MemoriesScreen from '../screens/MemoriesScreen';
import HighlightScreen from '../screens/HighlightScreen';
import GiftBoxScreen from '../screens/GiftBoxScreen';
import GiftRevealScreen from '../screens/GiftRevealScreen';
import ClosingScreen from '../screens/ClosingScreen';
import AudioPlayer from '../components/AudioPlayer';
import ClickEffects from '../components/ClickEffects';
import { useContent } from '../context/ContentContext';
import AdminControls from '../components/admin/AdminControls';

import { AnimatePresence, motion } from 'framer-motion';

interface ViewerProps {
    admin?: boolean;
}

const Viewer: React.FC<ViewerProps> = ({ admin = false }) => {
    const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.PRELOADER);
    const [isPlaying, setIsPlaying] = useState(false);
    const { content, isLoading, error } = useContent();

    const screens = content?.screens;

    // Auto-advance Preloader
    useEffect(() => {
        if (currentScreen === ScreenName.PRELOADER && screens?.preloader) {
            const timer = setTimeout(() => {
                setCurrentScreen(ScreenName.OPENING);
            }, screens.preloader.duration || 3500);
            return () => clearTimeout(timer);
        }
    }, [currentScreen, screens]);

    if (isLoading) return <div className="flex items-center justify-center min-h-screen text-xl font-medium text-gray-600">Loading Tribute...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">{error}</div>;
    if (!screens) return null;

    const goToNext = () => {
        switch (currentScreen) {
            case ScreenName.OPENING: setCurrentScreen(ScreenName.GREETING); break;
            case ScreenName.GREETING: setCurrentScreen(ScreenName.MESSAGE); break;
            case ScreenName.MESSAGE: setCurrentScreen(ScreenName.MEMORIES); break;
            case ScreenName.MEMORIES: setCurrentScreen(ScreenName.HIGHLIGHT); break;
            case ScreenName.HIGHLIGHT: setCurrentScreen(ScreenName.GIFT_BOX); break;
            case ScreenName.GIFT_BOX: setCurrentScreen(ScreenName.GIFT_REVEAL); break;
            case ScreenName.GIFT_REVEAL: setCurrentScreen(ScreenName.CLOSING); break;
            case ScreenName.CLOSING: setCurrentScreen(ScreenName.GREETING); break;
            default: break;
        }
    };

    const handleBack = () => {
        if (currentScreen === ScreenName.GREETING) setCurrentScreen(ScreenName.OPENING);
        if (currentScreen === ScreenName.MESSAGE) setCurrentScreen(ScreenName.GREETING);
        if (currentScreen === ScreenName.MEMORIES) setCurrentScreen(ScreenName.MESSAGE);
        if (currentScreen === ScreenName.HIGHLIGHT) setCurrentScreen(ScreenName.MEMORIES);
        if (currentScreen === ScreenName.GIFT_BOX) setCurrentScreen(ScreenName.HIGHLIGHT);
        if (currentScreen === ScreenName.CLOSING) setCurrentScreen(ScreenName.GIFT_REVEAL);
    };

    const getCurrentScreenData = () => {
        switch (currentScreen) {
            case ScreenName.PRELOADER: return screens.preloader;
            case ScreenName.OPENING: return screens.opening;
            case ScreenName.GREETING: return screens.greeting;
            case ScreenName.MESSAGE: return screens.message;
            case ScreenName.MEMORIES: return screens.memories;
            case ScreenName.HIGHLIGHT: return screens.highlight;
            case ScreenName.GIFT_BOX: return screens.giftBox;
            case ScreenName.GIFT_REVEAL: return screens.giftReveal;
            case ScreenName.CLOSING: return screens.closing;
            default: return {};
        }
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case ScreenName.PRELOADER: return <Preloader data={screens.preloader} />;
            case ScreenName.OPENING: return <OpeningScreen data={screens.opening} onNext={goToNext} />;
            case ScreenName.GREETING: return <GreetingScreen data={screens.greeting} onNext={goToNext} />;
            case ScreenName.MESSAGE: return <MessageScreen data={screens.message} onNext={goToNext} onBack={handleBack} />;
            case ScreenName.MEMORIES: return <MemoriesScreen data={screens.memories} onNext={goToNext} onBack={handleBack} />;
            case ScreenName.HIGHLIGHT: return <HighlightScreen data={screens.highlight} memories={screens.memories.memories} onNext={goToNext} onBack={handleBack} />;
            case ScreenName.GIFT_BOX: return <GiftBoxScreen data={screens.giftBox} recipientName={content.recipientName} onOpen={goToNext} onBack={handleBack} />;
            case ScreenName.GIFT_REVEAL: return <GiftRevealScreen data={screens.giftReveal} onNext={goToNext} />;
            case ScreenName.CLOSING: return <ClosingScreen data={screens.closing} onReplay={goToNext} />;
            default: return <Preloader />;
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-surface-light overflow-hidden font-sans transition-colors duration-500" style={{ backgroundColor: 'var(--color-bg)' }}>
            <ClickEffects />
            <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

            {/* Admin Controls - Only visible if admin prop is true */}
            {admin && <AdminControls currentScreen={currentScreen} data={getCurrentScreenData()} />}

            {/* Main Container */}
            <div className="w-full h-full max-w-md mx-auto relative shadow-2xl min-h-screen bg-white transition-all duration-300" style={{ fontFamily: 'var(--font-main)' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScreen}
                        className="w-full min-h-screen relative"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {renderScreen()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Viewer;

