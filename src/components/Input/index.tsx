import React from 'react'
import { useCallback, useContext, useRef } from "react";
import classNames from "classnames";
import { ThemeContext } from "../ThemeProvider";

import styles from "./styles.module.css";

export interface InputProps {
  onChange?: (HTML: string) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
}

export function Input({
  onChange,
  style,
  className,
  placeholder
}: InputProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const { cssVariables } = useContext(ThemeContext);
  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      if (e.currentTarget.innerHTML === "<br>") {
        e.currentTarget.innerHTML = "";
      }
      if (onChange) onChange(e.currentTarget.innerHTML);
    },
    [onChange]
  );

  return (
    <div
      ref={inputRef}
      role="textbox"
      className={classNames(styles.Input, className)}
      contentEditable
      onInput={handleInput}
      placeholder={placeholder}
      style={{ ...cssVariables, ...style }}
    />
  );
}
