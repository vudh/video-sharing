import { CardContent, TextField, Grid } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import CommonDialogActions from "components/common/common-dialog-actions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import PaperComponent from "components/common/paper-component";

import { useFormik } from "formik";
import * as Yup from "yup";
import { ShareVideoProps } from "./share-video-props";

const ShareVideoDialog = ({ open, onClose, onSave }: ShareVideoProps) => {
  const initialValues = {
    title: "",
    url: "",
    desc: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().max(100).required("Title is required"),
      url: Yup.string().required("Video url is required"),
      desc: Yup.string().max(500),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      await onSave(values);
      setIsSubmitting(false);
    },
  });

  const handleClose = () => {
    if (isSubmitting) return;

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Share a video
        </DialogTitle>
        <DialogContent dividers>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  label="Title"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.title}
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.url && formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url}
                  label="Video url"
                  name="url"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.url}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.desc && formik.errors.desc)}
                  helperText={formik.touched.desc && formik.errors.desc}
                  label="Description"
                  name="desc"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.desc}
                  variant="outlined"
                  multiline
                  maxRows={5}
                />
              </Grid>
            </Grid>
          </CardContent>
        </DialogContent>
        <CommonDialogActions
          isSubmitting={isSubmitting}
          handleClose={handleClose}
          handleSave={undefined}
        />
      </form>
    </Dialog>
  );
};

export default ShareVideoDialog;
