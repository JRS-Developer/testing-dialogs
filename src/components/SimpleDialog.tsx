"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const SimpleDialog = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Simple Dialog</button>

      {open &&
        createPortal(
          <>
            <div
              style={{
                position: "fixed",
                zIndex: 100,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                role="dialog"
                style={{
                  background: "white",
                  border: "1px solid gray",
                  height: "100%",
                  width: "100%",
                  overflowY: "auto",
                }}
              >
                <div className="flex justify-between items-center">
                  <h1>Simple Dialog</h1>
                  <button onClick={onClose}>Close</button>
                </div>
                {children}
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
