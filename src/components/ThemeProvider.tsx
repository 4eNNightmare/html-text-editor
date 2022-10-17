import React from 'react'
import { AnyColor, colord } from "colord";
import { createContext, ReactNode, useMemo } from "react";
import { buildDesignTokens } from "../utils/design_tokens";

export interface ThemeProviderProps {
  onChange?: (HTML: string) => void;
  primaryKey?: AnyColor;
  secondaryKey?: AnyColor;
  mode?: "light" | "dark";
  square?: boolean;
  children?: ReactNode;
}

export const ThemeContext = createContext<{
  cssVariables?: { [key: string]: string };
}>({});

export function ThemeProvider({
  primaryKey = "#4c8bf5",
  secondaryKey,
  mode,
  square,
  children
}: ThemeProviderProps) {
  const cssVariables = useMemo(() => {
    const tokens = buildDesignTokens({
      primaryKey,
      secondaryKey: secondaryKey ?? primaryKey,
      mode
    });
    return {
      "--hte-primary": tokens.colors.primary,
      "--hte-on-primary": tokens.colors.onPrimary,
      "--hte-secondary": tokens.colors.secondary,
      "--hte-on-secondary": tokens.colors.onSecondary,
      "--hte-surface": tokens.colors.surface,
      "--hte-on-surface": tokens.colors.onSurface,
      "--hte-surface-variant": tokens.colors.surfaceVariant,
      "--hte-on-surface-variant": tokens.colors.onSurfaceVariant,
      "--hte-outline": tokens.colors.outline,
      "--hte-primary-container": tokens.colors.primaryContainer,
      "--hte-on-primary-container": tokens.colors.onPrimaryContainer,
      "--hte-secondary-container": tokens.colors.secondaryContainer,
      "--hte-on-secondary-container": tokens.colors.onSecondaryContainer,
      "--hte-hover": colord(tokens.colors.onSurface).alpha(0.08).toRgbString(),
      "--hte-focus": colord(tokens.colors.onSurface).alpha(0.12).toRgbString(),
      "--hte-press": colord(tokens.colors.onSurface).alpha(0.12).toRgbString(),
      "--hte-border-radius": square ? "0px" : "24px"
    };
  }, [primaryKey, secondaryKey, mode, square]);

  return (
    <ThemeContext.Provider value={{ cssVariables }}>
      {children}
    </ThemeContext.Provider>
  );
}
