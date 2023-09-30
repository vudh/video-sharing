import { CardContent, TextField, Grid } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import CommonDialogActions from "components/common/common-dialog-actions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import PaperComponent from "components/common/paper-component";

import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterUserProps } from "./register-user-props";

const RegisterDialog = ({ open, onClose, onSave }: RegisterUserProps) => {
  const initialValues = {
    email: "",
    name: "",
    password: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email().max(100).required("Email is required"),
      name: Yup.string().max(100).required("Name is required"),
      password: Yup.string().max(100).required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const ok = await onSave(values);
      if (ok) formik.resetForm();
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
          Register new account
        </DialogTitle>
        <DialogContent dividers>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.email}
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.name}
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
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

export default RegisterDialog;
