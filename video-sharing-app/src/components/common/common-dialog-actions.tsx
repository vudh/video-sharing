import { Box, Button, CircularProgress } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";

const CommonDialogActions = ({ isSubmitting, handleClose, handleSave }) => {
  return (
    <DialogActions style={{ minWidth: 300 }}>
      {isSubmitting ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" onClick={handleSave}>
            Save
          </Button>
        </>
      )}
    </DialogActions>
  );
};

export default CommonDialogActions;
