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

export const GET_NODE_INFO = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "currentTimestamp": 1781906997840,
  "uptime": 28943515,
  "buildVersion": "qortal-6.1.6-e05ea5a",
  "buildTimestamp": 1781702596,
  "nodeId": "NXZPab2B3ebsGHe13tOJebGeG7Ga8oX0Rd",
  "isTestNet": false,
  "type": "full"
  }
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "GET_NODE_INFO"
});
`.trim();

  const tsInterface = `
interface GetNodeInfoRequest {
  action: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "GET_NODE_INFO",
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
          Retrieve information about the currently connected Qortal node. This
          action provides details like node version, synchronization status, and
          network capabilities.
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
              Simply click the button below to retrieve node information.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Get Node Info"
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
