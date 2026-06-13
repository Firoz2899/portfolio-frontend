
import { localStorageKeys } from '@/constants';
import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'
import { useAppActions, useAppSelector } from './redux';

type ThemeMode = "light" | "dark";

export  function useThemeMode() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useLocalStorage<ThemeMode | null>(localStorageKeys.themeMode, null)
  const {themeMode} = useAppSelector(x => x.app)
  const {setThemeMode} = useAppActions()

  // Effective mode
  const currentMode: ThemeMode = mode ?? (prefersDark ? "dark" : "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "dark");
    setThemeMode(currentMode)
  }, [currentMode]);

  
  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark:bg-gray-900');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    const finalMode = currentMode === "dark" ? "light" : "dark";
    setThemeMode(finalMode)
    setMode(finalMode);
  };
    
  return {
    mode: currentMode,
    isDarkMode: currentMode === "dark",
    setTheme: setMode,
    toggleTheme,
  };
}
