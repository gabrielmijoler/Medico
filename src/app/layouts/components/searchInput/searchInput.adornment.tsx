import type { Dispatch, SetStateAction } from "react";

import { Close, Search } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

type TProps = {
  onSubmit: VoidFunction;
  value: string;
  position: "end" | "start";
  onChange: Dispatch<SetStateAction<string>>;
};

const Adorment = ({ onSubmit, value, position = "end", onChange }: TProps) => {
  if (value) {
    const handleClear = () => {
      onChange("");
    };
    return (
      <InputAdornment position={position}>
        <IconButton onClick={handleClear}>
          <Close />
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <InputAdornment position={position}>
      <IconButton onClick={onSubmit}>
        <Search />
      </IconButton>
    </InputAdornment>
  );
};

export default Adorment;
