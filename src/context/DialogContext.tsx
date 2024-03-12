import { ComponentProps, PropsWithChildren, createContext, useRef } from "react";
import DialogConfirmation from "../components/DialogConfirmation";

export type DialogProps = Partial<Omit<ComponentProps<typeof DialogConfirmation>, "open" | "handleOk" | "handleCancel">> & {
  title?: string;
  content?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultFunction = (p?: DialogProps) => Promise.resolve(true); // En l'absence de contexte, on renvoie true directement

const defaultValue = {
  confirmRef: {
    current: defaultFunction,
  },
};

export const DialogContext = createContext(defaultValue);

const DialogProvider = ({ children }: PropsWithChildren) => {
  const confirmRef = useRef(defaultFunction);
  return (
    <DialogContext.Provider value={{ confirmRef }}>
      {children}
      <DialogConfirmation />
    </DialogContext.Provider>
  );
};

export default DialogProvider;
