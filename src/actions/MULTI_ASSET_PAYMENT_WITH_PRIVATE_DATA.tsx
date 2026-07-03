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

export const MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    assetId: 123,
    payments: [
      {
        recipient: "QZLJ5GGK3L5W5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y",
        amount: 100,
        assetId: 123,
      },
    ],
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "success": true,
  "txId": "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA",
  assetId: ${requestData.assetId},
  payments: ${JSON.stringify(requestData.payments)}
});
`.trim();

  const tsInterface = `
interface MultiAssetPaymentWithPrivateDataRequest {
  action: string;
  assetId: number;
  payments: Array<{
    recipient: string;
    amount: number;
    assetId: number;
  }>;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "MULTI_ASSET_PAYMENT_WITH_PRIVATE_DATA",
        assetId: requestData.assetId,
        payments: requestData.payments,
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
          Send a payment that involves multiple assets and includes private
          data. This action enables complex transactions with multiple
          recipients and asset types while keeping certain data private. The
          private data is encrypted and only accessible to authorized parties.
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
            <Typography>Enter the asset ID for the payment.</Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">payments</Typography>
            <Spacer height="10px" />
            <Typography variant="body2" sx={{ mb: 1 }}>
              Array of payment objects (simplified for demo)
            </Typography>
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Each payment requires: recipient (address), amount, and assetId.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Send Multi-Asset Payment"
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
