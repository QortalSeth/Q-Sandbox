import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

interface FeatureListItem {
  title: string;
  description: React.ReactNode;
}

interface FeatureListProps {
  items?: FeatureListItem[];
}

export function FeatureList({ items = [] }: FeatureListProps) {
  return (
    <Box sx={{ maxWidth: 800, p: 2 }}>
      <List>
        {items.map((item, idx) => (
          <ListItem
            key={idx}
            alignItems="flex-start"
            disableGutters
            sx={{ display: "list-item", pl: 2 }}
          >
            <ListItemText
              primary={
                <Typography component="span" fontWeight="bold">
                  • {item.title}
                </Typography>
              }
              secondary={
                <Typography component="span">{item.description}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}