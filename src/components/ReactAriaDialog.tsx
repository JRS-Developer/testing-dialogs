"use client";
import { createContext, useContext, useRef } from "react";
import {
  Overlay,
  useModalOverlay,
  useOverlayTrigger,
  useDialog,
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";

const DialogContext = createContext<{
  overlayTriggerProps: ReturnType<typeof useOverlayTrigger>;
  state: ReturnType<typeof useOverlayTriggerState>;
} | null>(null);

const useDialogContext = () => {
  const context = useContext(DialogContext);
  return context;
};

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const state = useOverlayTriggerState({});
  const overlayTriggerProps = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <DialogContext.Provider
      value={{
        overlayTriggerProps,
        state,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

const DialogRealContent = ({ children }: { children: React.ReactNode }) => {
  const context = useDialogContext();
  const modalRef = useRef(null);
  const dialogRef = useRef(null);
  const state = context?.state;
  const { modalProps, underlayProps } = useModalOverlay(
    {
      isDismissable: true,
    },
    state!,
    modalRef,
  );

  const { dialogProps, titleProps } = useDialog(
    {
      ...context?.overlayTriggerProps.overlayProps,
    },
    dialogRef,
  );

  return (
    <Overlay>
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
        {...underlayProps}
      >
        <div
          {...modalProps}
          ref={modalRef}
          style={{
            background: "white",
            border: "1px solid gray",
            height: "100%",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <div {...dialogProps} ref={dialogRef}>
            <div className="flex justify-between items-center">
              <h3 {...titleProps}>React Aria</h3>
              <button
                onClick={() => {
                  state?.close();
                }}
              >
                Close
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  const context = useDialogContext();
  const state = context?.state;

  if (!state?.isOpen) {
    return null;
  }

  return <DialogRealContent>{children}</DialogRealContent>;
};

export const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const context = useDialogContext();
  const { onPress, ...triggerProps } =
    context?.overlayTriggerProps.triggerProps ?? {};

  return (
    <button
      {...triggerProps}
      onClick={(e) => {
        onPress?.(e as any);
      }}
    >
      {children}
    </button>
  );
};
