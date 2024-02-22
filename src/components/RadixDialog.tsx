"use client";
import * as RadixDialog from "@radix-ui/react-dialog";

export const Dialog = RadixDialog.Root;

export const DialogTrigger = RadixDialog.Trigger;

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
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
        <RadixDialog.Content
          style={{
            background: "white",
            border: "1px solid gray",
            height: "100%",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center">
            <RadixDialog.Title>Radix</RadixDialog.Title>
            <RadixDialog.Close>Close</RadixDialog.Close>
          </div>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Overlay>
    </RadixDialog.Portal>
  );
};
