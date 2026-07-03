"use client";
import { ThemeProvider } from "@emotion/react";
import React, { FC } from "react";
import { useThemeStore } from "./atoms/global";

import { darkTheme, lightTheme } from "./styles/theme";

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
