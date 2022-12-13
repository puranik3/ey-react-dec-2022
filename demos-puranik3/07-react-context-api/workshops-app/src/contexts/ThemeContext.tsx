import { createContext } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeContextType = {
    theme: Theme,
    toggle: Function
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggle() {}
});

// ThemeContext.Provider (used in the component with the state - here it is the App component)
// ThemeContext.Consumer (only useful for consuming context in class components)
export default ThemeContext;