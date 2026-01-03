import { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

import { TextField, type TextFieldProps } from "@mui/material";

type IIntegerProps = Omit<NumericFormatProps, "size" | "format"> & {
  size?: "small" | "medium";
  color?: "error" | "primary" | "secondary" | "info" | "success" | "warning";
  error?: boolean;
  label?: string;
} & Pick<TextFieldProps, "slotProps">;

const NumericField = forwardRef<TextFieldProps, IIntegerProps>((props, ref) => {
  return (
    <NumericFormat
      {...props}
      className={props.disabled ? "MuiInputBase-root Mui-disabled" : ""}
      customInput={TextField}
      fullWidth
      getInputRef={ref}
      variant="outlined"
    />
  );
});

NumericField.displayName = "NumericField";

export default NumericField;
