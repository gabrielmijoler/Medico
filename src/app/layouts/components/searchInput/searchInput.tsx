import { useCallback } from "react";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";

import colors from "@/app/theme/colors";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import Adorment from "./searchInput.adornment";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
    backgroundColor: colors.common.white,
  },
  "& input::placeholder": {
    fontSize: "14px",
  },
});

type TProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: VoidFunction;
  label?: string;
  placeholder?: string;
};

export default function SearchInput({
  value,
  label,
  placeholder,
  onChange,
  onSubmit,
}: TProps) {
  const handleClickEnter = useCallback(
    (ev: KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        onSubmit();
      }
    },
    [onSubmit],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTextField
      fullWidth
      id="search-input"
      label={label ?? "Pesquisar"}
      onChange={handleChange}
      onKeyDown={handleClickEnter}
      placeholder={placeholder ?? "Pesquisar"}
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <Adorment
              onChange={onChange}
              onSubmit={onSubmit}
              position="end"
              value={value}
            />
          ),
        },
      }}
      value={value}
    />
  );
}
