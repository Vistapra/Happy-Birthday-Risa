import React, { createContext, useContext, useEffect } from 'react';
import { ThemeConfig } from '../types';

interface ThemeContextType {
    theme: ThemeConfig;
    setTheme: (theme: ThemeConfig) => void;
}

// We will rely on ContentContext to provide the theme data, 
// but this specific Context can be used to isolate Theme logic/helper methods if needed.
// For now, it will primarily accept the theme from props and apply side effects.

export const applyTheme = (theme: ThemeConfig) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-bg', theme.backgroundColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--font-main', theme.fontFamily);
    // Add more as needed
};
