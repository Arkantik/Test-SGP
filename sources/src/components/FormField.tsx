"use client";

import { Box, TextField, Typography } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

type FormFieldProps = TextFieldProps & {
  label: string;
};

export default function FormField({ label, ...props }: FormFieldProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
      <Typography variant="body2" fontWeight={500} color="text.primary">
        {label}
      </Typography>
      <TextField fullWidth size="small" {...props} />
    </Box>
  );
}