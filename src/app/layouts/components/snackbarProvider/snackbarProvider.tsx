"use client";

import { createContext, forwardRef, useState } from "react";
import type { PropsWithChildren } from "react";

import theme from "@/app/theme/mui";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import type { AlertColor, AlertProps } from "@mui/material/Alert";
import MuiAlert from "@mui/material/Alert";
import type { SlideProps } from "@mui/material/Slide";
import Slide from "@mui/material/Slide";
import type {
  SnackbarCloseReason,
  SnackbarOrigin,
} from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";
type TSnackbarContext = {
  snack: {
    message: string;
    open: boolean;
    color?: AlertColor;
    position?: SnackbarOrigin;
    permanent?: boolean;
  };
  setSnack: React.Dispatch<
    React.SetStateAction<{
      message: string;
      color?: AlertColor;
      open: boolean;
      position?: SnackbarOrigin;
      permanent?: boolean;
    }>
  >;
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

export const SnackbarContext = createContext<TSnackbarContext>(
  {} as TSnackbarContext,
);

const colors = {
  success: theme.palette.success.light,
  info: theme.palette.info.light,
  warning: theme.palette.warning.light,
  error: theme.palette.error.light,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return (
      <MuiAlert
        {...props}
        className={`bg-white text-multi-neutral-900 border-b-2 `}
        elevation={6}
        iconMapping={{
          success: <CheckCircleIcon style={{ color: colors.success }} />,
          error: <ErrorIcon style={{ color: colors.error }} />,
          warning: <WarningIcon style={{ color: colors.warning }} />,
          info: <InfoIcon style={{ color: colors.info }} />,
        }}
        ref={ref}
        style={{
          borderColor: colors[props.severity ?? "info"],
        }}
      />
    );
  },
);

const DURATION_IN_SECONDS = 5000;

const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [snack, setSnack] = useState<TSnackbarContext["snack"]>({
    message: "",
    color: "info",
    open: false,
    position: {
      horizontal: "center",
      vertical: "bottom",
    },
    permanent: false,
  });

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    setSnack((currentSnack) => ({ ...currentSnack, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <Snackbar
        TransitionComponent={SlideTransition}
        anchorOrigin={
          snack.position ?? { horizontal: "center", vertical: "bottom" }
        }
        autoHideDuration={snack.permanent ? null : DURATION_IN_SECONDS}
        onClose={handleClose}
        open={snack.open}
      >
        <Alert
          onClose={handleClose}
          severity={snack.color ?? "info"}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
