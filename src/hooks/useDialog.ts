import { useContext, useCallback } from "react";
import { DialogContext, DialogProps } from "../context/DialogContext";

export function useDialog() {
  const { confirmRef } = useContext(DialogContext);
  return {
    dialog: useCallback(
      (p: DialogProps) => {
        return confirmRef.current(p);
      },
      [confirmRef]
    ),
  };
}
