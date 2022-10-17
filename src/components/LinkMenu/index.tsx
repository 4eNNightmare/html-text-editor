import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { MdCheck, MdClose } from "react-icons/md";
import { ThemeContext } from "../ThemeProvider";

import styles from "./styles.module.css";

export interface LinkMenuRef {
  open: (x: number, y: number) => void;
  close: () => void;
}

interface LinkMenuProps {
  onConfirm: (link: string) => void;
}

export const LinkMenu = forwardRef<LinkMenuRef, LinkMenuProps>(
  ({ onConfirm }, ref) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const inputRef = useRef<HTMLInputElement>(null);
    const handleOpen = useCallback((x: number, y: number) => {
      setPosition({ x, y });
      setVisible(true);
    }, []);
    const { cssVariables } = useContext(ThemeContext);

    const handleClose = useCallback(() => {
      setVisible(false);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose
      }),
      [handleOpen, handleClose]
    );

    const variables = useMemo(() => {
      return {
        "--hte-menu-top": `${position.y}px`,
        "--hte-menu-left": `${position.x}px`,
        ...cssVariables
      };
    }, [position, cssVariables]);

    if (!visible) return null;

    return createPortal(
      <div className={styles.MenuContainer} style={variables}>
        <div className={styles.MenuScrim} onClick={handleClose} />
        <div className={styles.MenuSurface}>
          <input
            type="text"
            ref={inputRef}
            className={styles.Input}
            contentEditable
            placeholder="https://example.com"
          />
          <div className={styles.Group}>
            <button
              className={styles.Button}
              onClick={() => onConfirm(inputRef.current?.value ?? "")}
            >
              <MdCheck size={24} />
            </button>
            <button className={styles.Button} onClick={handleClose}>
              <MdClose size={24} />
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);
