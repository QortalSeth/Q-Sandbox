import InfoIcon from "@mui/icons-material/Info";
import { Box, Card, Typography } from "@mui/material";

export const GeneralExplanation = ({ children }) => {
  return (
    <Card>
      <InfoIcon />
      {children}
    </Card>
  );
};

export const FieldExplanation = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography>
        <InfoIcon />
      </Typography>
      {children}
    </Box>
  );
};
