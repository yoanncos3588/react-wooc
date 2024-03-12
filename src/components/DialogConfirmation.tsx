import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { DialogContext, DialogProps } from "../context/DialogContext";

function DialogConfirmation() {
  const [open, setOpen] = useState(false);
  const [props, setProps] = useState<undefined | DialogProps>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const resolveRef = useRef((_v: boolean) => {});
  const { confirmRef } = useContext(DialogContext);

  confirmRef.current = (props) =>
    new Promise((resolve) => {
      setProps(props);
      setOpen(true);
      resolveRef.current = resolve;
    });

  const handleOk = () => {
    resolveRef.current(true);
    setOpen(false);
  };

  const handleCancel = () => {
    resolveRef.current(false);
    setOpen(false);
  };

  return (
    <Dialog sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }} maxWidth="xs" open={open}>
      {props && props.title && <DialogTitle>{props.title}</DialogTitle>}
      <DialogContent dividers>{props && props.content ? props.content : "Confirmer cette action ?"}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Annuler
        </Button>
        <Button onClick={handleOk}>Confirmer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogConfirmation;
