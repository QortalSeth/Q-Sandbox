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
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `,
);

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

export const GET_NODE_STATUS = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "isMintingPossible": true,
  "isSynchronizing": false,
  "syncPercent": 100,
  "numberOfConnections": 108,
  "numberOfDataConnections": 124,
  "height": 2621398
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "GET_NODE_STATUS"
});
`.trim();

  const tsInterface = `
interface GetNodeStatusRequest {
  action: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "GET_NODE_STATUS",
      });

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
          Retrieve the current status of the connected Qortal node. This action
          provides real-time information about synchronization progress, block
          height, and connectivity.
        </Typography>
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
            <Typography variant="h6">No fields required</Typography>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>This action requires no parameters</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Simply click the button below to retrieve node status.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Get Node Status"
            bgColor="#309ed1"
            onClick={executeQortalRequest}
          />
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
