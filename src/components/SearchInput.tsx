import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface SearchInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState("");

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, onChange]);

  const showClear = Boolean(inputValue);

  return (
    <TextField
      size="small"
      fullWidth
      variant="outlined"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      sx={{
        maxWidth: "250px",
      }}
      placeholder={placeholder}
      slots={{
        endAdornment: () =>
          showClear ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setInputValue("")}
                edge="end"
                aria-label="clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      {...props}
    />
  );
}