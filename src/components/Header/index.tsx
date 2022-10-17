import { useContext } from 'react';
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdInsertLink,
  MdUndo,
  MdRedo,
  MdFormatListNumbered,
  MdFormatListBulleted
} from "react-icons/md";
import classNames from "classnames";
import { LinkMenu, LinkMenuRef } from "../LinkMenu";
import useAnimationFrame from "../../utils/useAnimationFrame";

import styles from "./styles.module.css";
import { ThemeContext } from '../ThemeProvider';
import { getSelectionRanges } from '../../utils/getSelectionRanges';
import { setSelectionRanges } from '../../utils/setSelectionRanges';

const cx = classNames.bind(styles);

export interface HeaderProps {
  center?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: boolean;
  undo?: boolean;
  redo?: boolean;
  orderedList?: boolean;
  unorderedList?: boolean;
}

export function Header(props: HeaderProps) {
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    insertOrderedList: false,
    insertUnorderedList: false
  });
  const menuRef = useRef<LinkMenuRef>(null);
  const caretPosition = useRef({ x: 0, y: 0 });
  const {cssVariables} = useContext(ThemeContext)
  const ranges = useRef<Range[] | null>(null);

  const cn = useMemo(() => {
    return {
      btn: {
        generic: cx({
          [styles.Button]: true
        }),
        bold: cx({
          [styles.Button]: true,
          [styles.Selected]: formatState.bold
        }),
        italic: cx({
          [styles.Button]: true,
          [styles.Selected]: formatState.italic
        }),
        underline: cx({
          [styles.Button]: true,
          [styles.Selected]: formatState.underline
        }),
        insertOrderedList: cx({
          [styles.Button]: true,
          [styles.Selected]: formatState.insertOrderedList
        }),
        insertUnorderedList: cx({
          [styles.Button]: true,
          [styles.Selected]: formatState.insertUnorderedList
        })
      }
    };
  }, [formatState]);

  const handleBold = useCallback(() => {
    document.execCommand("bold");
  }, []);

  const handleItalic = useCallback(() => {
    document.execCommand("italic");
  }, []);

  const handleLink = useCallback(() => {
    ranges.current = getSelectionRanges();
    menuRef.current?.open(caretPosition.current.x, caretPosition.current.y);
  }, []);

  const handleLinkConfirm = useCallback((link: string) => {
    menuRef.current?.close();
    if (ranges.current) {
      setSelectionRanges(ranges.current);
      document.execCommand("createLink", false, link);
    }
  }, []);

  const handleUnderline = useCallback(() => {
    document.execCommand("underline");
  }, []);

  const handleUndo = useCallback(() => {
    document.execCommand("undo");
  }, []);

  const handleRedo = useCallback(() => {
    document.execCommand("redo");
  }, []);

  const handleInsertOrderedList = useCallback(() => {
    document.execCommand("insertOrderedList");
  }, []);

  const handleInsertUnorderedList = useCallback(() => {
    document.execCommand("insertUnorderedList");
  }, []);

  useAnimationFrame(() => {
    try {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const rect = range?.getClientRects()[0];
      if (rect) caretPosition.current = { x: rect.x, y: rect.y };
    } catch (e) {}
    setFormatState({
      bold: document.queryCommandValue("bold") === "true",
      italic: document.queryCommandValue("italic") === "true",
      underline: document.queryCommandValue("underline") === "true",
      insertOrderedList:
        document.queryCommandValue("insertOrderedList") === "true",
      insertUnorderedList:
        document.queryCommandValue("insertUnorderedList") === "true"
    });
  });

  const variables = useMemo(() => {
    return {
      ...cssVariables,
      '--hte-header-justify-content': props.center ? 'center' : 'left'
    }
  }, [cssVariables, props.center])

  return (
    <div className={styles.Header} style={variables}>
      <div className={styles.Group}>
        {props.bold && (
          <button title="Bold" className={cn.btn.bold} onClick={handleBold}>
            <MdFormatBold size={24} />
          </button>
        )}
        {props.italic && (
          <button title="Italic" className={cn.btn.italic} onClick={handleItalic}>
            <MdFormatItalic size={24} />
          </button>
        )}
        {props.underline && (
          <button
            title="Underline"
            className={cn.btn.underline}
            onClick={handleUnderline}
          >
            <MdFormatUnderlined size={24} />
          </button>
        )}
      </div>
      <div className={styles.Group}>
        {props.link && (
          <button title="Link" className={cn.btn.generic} onClick={handleLink}>
            <MdInsertLink size={24} />
          </button>
        )}
      </div>
      <div className={styles.Group}>
        {props.orderedList && (
          <button
            title="Ordered List"
            className={cn.btn.insertOrderedList}
            onClick={handleInsertOrderedList}
          >
            <MdFormatListNumbered size={24} />
          </button>
        )}
        {props.unorderedList && (
          <button
            title="Unordered List"
            className={cn.btn.insertUnorderedList}
            onClick={handleInsertUnorderedList}
          >
            <MdFormatListBulleted size={24} />
          </button>
        )}
      </div>
      <div className={styles.Group}>
        {props.undo && (
          <button title="Undo" className={cn.btn.generic} onClick={handleUndo}>
            <MdUndo size={24} />
          </button>
        )}
        {props.redo && (
          <button title="Redo" className={cn.btn.generic} onClick={handleRedo}>
            <MdRedo size={24} />
          </button>
        )}
      </div>
      <LinkMenu ref={menuRef} onConfirm={handleLinkConfirm} />
    </div>
  );
}
