import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTheme, toggleTheme } from '@/redux/slices/uiSlice';
import { Sun, Moon } from 'lucide-react-native';
import { colors, darkColors } from './theme';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? (
        <Moon size={24} color={themeColors.onPrimaryContainer} style={styles.icon} />
      ) : (
        <Sun size={24} color={themeColors.onPrimaryContainer} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginRight: 8,
  },
  icon: {
    padding: 8,
  },
});

export default ThemeToggle;