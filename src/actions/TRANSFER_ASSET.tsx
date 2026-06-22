import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
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

export const TRANSFER_ASSET = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    amount: "",
    assetId: "",
    recipient: "",
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
{
  "type": "TRANSFER_ASSET",
  "timestamp": 1782165314537,
  "reference": "AmjzsniEEbWDwY8Bi7AmMTXHKxbCAP1NRRskZrwY1eZMcTrsDFiFpWdgN1muKRaRJ895o3Zyw9DqXZK7KPdpeEH",
  "fee": "0.01000000",
  "signature": "5n4x6WcTxuFjRzFZjAjwjuNUb4nYGMvL6bvQ7NsvVQhCbEz1XBNNSTebqYQVvm2kWxwxfetokRcc38rJ1mjiRRme",
  "txGroupId": 0,
  "recipient": "QatQLepQT3PEu9fEiXe44nhpAAgMj31TCf",
  "approvalStatus": "NOT_REQUIRED",
  "creatorAddress": "QeJW96BDMFkmVPofkjY87stvMR7VSbj5W9",
  "senderPublicKey": "FkK6v7evyk3xeBeB6NJUzRDP5WY7GCgfSpMgoSVWx5Mt",
  "amount": "1.00000000",
  "assetId": 0
}
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "TRANSFER_ASSET"${
    requestData.amount
      ? `,
  amount: ${requestData.amount}`
      : ""
  }${
    requestData.assetId
      ? `,
  assetId: ${requestData.assetId}`
      : ""
  }${
    requestData.recipient
      ? `,
  recipient: "${requestData.recipient}"`
      : ""
  }
});
`.trim();

  const tsInterface = `
interface TransferAssetRequest {
  action: string;
  amount: number;
  assetId: number;
  recipient: string;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "TRANSFER_ASSET",
        amount: requestData.amount,
        assetId: requestData.assetId,
        recipient: requestData.recipient,
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
        [e.target.name]: e.target.value,
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
          Transfer a custom asset from the current wallet to another address.
          This action handles the transfer of Qortal assets that are not native
          QORT coins. The asset ID, amount, and recipient address are required
          to complete the transfer.
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
            <Typography variant="h6">amount</Typography>
            <CustomInput
              type="number"
              placeholder="amount"
              value={requestData.amount}
              name="amount"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the amount to transfer.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">assetId</Typography>
            <CustomInput
              type="number"
              placeholder="assetId"
              value={requestData.assetId}
              name="assetId"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the asset ID to transfer.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">recipient</Typography>
            <CustomInput
              type="text"
              placeholder="recipient"
              value={requestData.recipient}
              name="recipient"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>Enter the recipient's Qortal address.</Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Transfer Asset"
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
