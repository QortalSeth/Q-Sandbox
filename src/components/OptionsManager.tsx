import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface OptionsManagerProps {
  items: string[];
  setItems: (items: string[]) => void;
  label?: string;
  maxLength?: number;
}

export function OptionsManager({
  items,
  setItems,
  label = "Item",
  maxLength,
}: OptionsManagerProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdateItem = () => {
    if (inputValue.trim() === "") return;

    if (editIndex !== null) {
      // Update item
      const updatedItems = [...items];
      updatedItems[editIndex] = inputValue;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      if (maxLength && items.length >= maxLength) return;
      // Add new item
      if (!items.includes(inputValue)) {
        setItems([...items, inputValue]);
      }
    }

    setInputValue(""); // Clear the input
  };

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditItem = (index: number) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label={editIndex !== null ? `Edit ${label}` : `Add ${label}`}
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddOrUpdateItem}>
          {editIndex !== null ? "Update" : "Add"}
        </Button>
      </Stack>

      <Box mt={2}>
        {items.map((item, index) => (
          <Chip
            key={index}
            label={item}
            onDelete={() => handleDeleteItem(index)}
            onClick={() => handleEditItem(index)}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}
