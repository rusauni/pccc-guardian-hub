import { useTheme as useThemeContext } from '@/contexts/ThemeProvider';

export function useTheme() {
  return useThemeContext();
}
