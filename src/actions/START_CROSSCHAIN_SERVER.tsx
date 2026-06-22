import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";

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
import { foreignBlockchains } from "../constants";

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

export const START_CROSSCHAIN_SERVER = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    coin: "BITCOIN",
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "success": true,
  "serverInfo": {
    "coin": "BITCOIN",
    "status": "RUNNING",
    "port": 8333
  }
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "START_CROSSCHAIN_SERVER",
  coin: "${requestData?.coin}"
});
`.trim();

  const tsInterface = `
interface StartCrosschainServerRequest {
  action: string;
  coin: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "START_CROSSCHAIN_SERVER",
        coin: requestData?.coin,
      } as any);

      setResponseData(formatResponse(JSON.stringify(result)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setRequestData((prev) => {
      return {
        ...prev,
        coin: e.target.value,
      };
    });
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <GeneralExplanation>
        <Typography variant="body1">
          Start a cross-chain trading server for a specific cryptocurrency. This
          action initiates the server process that enables cross-chain trading
          functionality. The server handles the complex logic of exchanging QORT
          for foreign cryptocurrencies.
        </Typography>
        <Typography variant="body1">Needs user approval</Typography>
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
            <Typography variant="h6">coin</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-coin"
              id="id-select-coin"
              value={requestData?.coin}
              displayEmpty
              onChange={handleChange}
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={0}>
                <em>No coin selected</em>
              </MenuItem>
              {foreignBlockchains?.map((blockchain) => {
                return (
                  <MenuItem key={blockchain.name} value={blockchain.name}>
                    {`${blockchain.name}`}
                  </MenuItem>
                );
              })}
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Select the foreign blockchain to start the server for.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Start Crosschain Server"
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
