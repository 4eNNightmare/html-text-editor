import React from 'react'
import { Header, HeaderProps } from "../Header";
import { Input, InputProps } from "../Input";
import { ThemeProvider, ThemeProviderProps } from "../ThemeProvider";

export interface HTMLTextEditorProps extends Omit<ThemeProviderProps, "children">, InputProps, HeaderProps {}

export function HTMLTextEditor({
  mode = "light",
  primaryKey = "#4c8bf5",
  secondaryKey,
  square,
  center,
  placeholder,
  bold = true,
  italic = true,
  underline = true,
  link = true,
  undo = true,
  redo = true,
  orderedList = true,
  unorderedList = true,
  className,
  style,
  onChange
}: HTMLTextEditorProps) {
  return (
    <ThemeProvider
      mode={mode}
      primaryKey={primaryKey}
      secondaryKey={secondaryKey}
      square={square}
    >
      <Header
        center={center}
        bold={bold}
        italic={italic}
        underline={underline}
        link={link}
        undo={undo}
        redo={redo}
        orderedList={orderedList}
        unorderedList={unorderedList}
      />
      <Input 
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        style={style}
      />
    </ThemeProvider>
  );
}
