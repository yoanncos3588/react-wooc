import { ComponentProps, PropsWithChildren, createContext, useRef } from "react";
import DialogConfirmation from "../components/DialogWithPromise";

export type DialogProps = Partial<Omit<ComponentProps<typeof DialogConfirmation>, "open" | "handleOk" | "handleCancel">> & {
  type: "confirm" | "login";
  title?: string;
  content?: string | JSX.Element;
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
