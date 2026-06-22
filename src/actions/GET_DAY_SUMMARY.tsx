import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import { GeneralExplanation } from "../components/QRComponents";
import { Spacer } from "../components/Spacer";

export const Label = styled("label")(
  ({ theme }: { theme: any }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `,
);

export const formatResponse = (code: string): string => {
  return beautify.js(code, {
    indent_size: 2, // Number of spaces for indentation
    space_in_empty_paren: true, // Add spaces inside parentheses
  });
};

interface ComponentProps {
  myAddress?: string;
}

export const GET_DAY_SUMMARY: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [responseData, setResponseData] = useState<string>(
    formatResponse(`
  
  `),
  );

  const codePollName: string = `
await qortalRequest({
  action: "GET_DAY_SUMMARY",
});
`.trim();

  const tsInterface: string = `
interface GetDaySummaryRequest {
  action: string;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "GET_DAY_SUMMARY",
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
          Summary of active in the past 24 hours.
        </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <Typography variant="h6">
          Apart from the action type, no other field is required.
        </Typography>

        <Spacer height="20px" />
        <Button
          name="Get Info"
          bgColor="#309ed1"
          onClick={executeQortalRequest}
        />
      </Card>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <h3>Request</h3>
          <DisplayCode codeBlock={codePollName} language="javascript" />
          <Spacer height="10px" />
          <h3>TS interface</h3>
          <DisplayCode codeBlock={tsInterface} language="javascript" />
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <h3>Response</h3>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DisplayCodeResponse
              codeBlock={responseData}
              language="javascript"
            />
          )}
        </Box>
      </Box>
    </div>
  );
};
