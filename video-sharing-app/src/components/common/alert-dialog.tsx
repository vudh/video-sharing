import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PaperComponent from "./paper-component";

const AlertDialog = ({ content, open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Information
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
