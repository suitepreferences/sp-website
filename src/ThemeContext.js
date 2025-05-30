import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
    // State to hold the current theme ('light' or 'dark')
    // Initialize with null to indicate no explicit preference yet, or to load from localStorage/system
    const [theme, setTheme] = useState(null);

    // Effect to set initial theme based on localStorage or system preference
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            // If a theme is stored in localStorage, use it
            setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Otherwise, check system preference
            setTheme('dark');
        } else {
            // Default to light if no preference found
            setTheme('light');
        }
    }, []); // Run only once on mount

    // Effect to apply the 'dark' class to the html element and update localStorage
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        // If theme is null (initial state), do nothing here as it's still being determined
    }, [theme]); // Run whenever 'theme' state changes

    // Effect to listen for system theme changes if no explicit preference is set
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // Only update if no explicit theme is set in localStorage
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        // Add listener
        mediaQuery.addEventListener('change', handleChange);

        // Clean up listener on component unmount
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []); // Run only once on mount

    // Function to toggle theme manually by user
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Provide the theme state and toggle function via context
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* Only render children when theme is determined to avoid flash of unstyled content */}
            {theme !== null && children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
