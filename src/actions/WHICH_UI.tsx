import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
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
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

interface ComponentProps {
  myAddress?: string;
}

export const WHICH_UI: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = `
await qortalRequest({
  action: "WHICH_UI",
});
`.trim();

  const tsInterface: string = `
interface WhichUIRequest {
  action: string;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "WHICH_UI",
      } as any);

      setResponseData(formatResponse(JSON.stringify(result)));
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
          Determine which UI environment the Qortal app is running in (e.g.,
          browser, desktop, mobile). This helps applications adapt their
          interface and behavior based on the platform.
        </Typography>
        <Typography variant="body1">No parameters required</Typography>
      </GeneralExplanation>

      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <div className="message-row">
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">No parameters required</Typography>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>This action requires no parameters</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Simply click the button below to determine the UI environment.
            </Typography>
            <Spacer height="20px" />
            <Button
              name="Which UI"
              bgColor="#309ed1"
              onClick={executeQortalRequest}
            />
          </Box>
        </div>
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
