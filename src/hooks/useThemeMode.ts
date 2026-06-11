
import { localStorageKeys } from '@/constants';
import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'

type ThemeMode = "light" | "dark";

export  function useThemeMode() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useLocalStorage<ThemeMode | null>(localStorageKeys.themeMode, null)

  // Effective mode
  const currentMode: ThemeMode = mode ?? (prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "dark");
  }, [currentMode]);

  const toggleTheme = () => {
    setMode(currentMode === "dark" ? "light" : "dark");
  };
    
  return {
    mode: currentMode,
    isDarkMode: currentMode === "dark",
    setTheme: setMode,
    toggleTheme,
  };
}
