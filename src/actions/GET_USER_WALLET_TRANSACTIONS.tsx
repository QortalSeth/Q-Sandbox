import WarningIcon from "@mui/icons-material/Warning";
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
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { coins } from "../constants";

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

export const GET_USER_WALLET_TRANSACTIONS = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    coin: "LTC",
    limit: 10,
    offset: 0,
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "transactions": [
    {
     "txHash": "DU1sYzPcRnvAUL6VzerhAmDQUyrn4UceAvV4K6WtZxBi",
  "timestamp": 1683389874000,
  "totalAmount": 1000000000,
  "feeAmount": 0,
  "inputs": [{
    "address": "[PRIVATE]",
    "amount": 1000000000,
    "addressInWallet": false
  }],
  "outputs": [{
    "address": "1KyDZurCr2S15N2j1s4pUeH8fAQVT7VfdB",
    "amount": 1000000000,
    "addressInWallet": true
  }]
}
    }
  ]
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "GET_USER_WALLET_TRANSACTIONS",
  coin: "${requestData?.coin}",
  limit: ${requestData.limit},
  offset: ${requestData.offset}
});
`.trim();

  const tsInterface = `
interface GetUserWalletTransactionsRequest {
  action: string;
  coin: string;
  limit?: number;
  offset?: number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "GET_USER_WALLET_TRANSACTIONS",
        coin: requestData?.coin,
        limit: requestData.limit,
        offset: requestData.offset,
      });

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
          Retrieve the transaction history for a specific cryptocurrency wallet.
          This action provides a list of past transactions including sent,
          received, and pending transfers. Pagination parameters allow for
          retrieving transactions in manageable chunks.
        </Typography>
        <Typography variant="body1">Needs user approval</Typography>
        <Spacer height="20px" />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <WarningIcon
            sx={{
              color: "gold",
            }}
          />
          <Typography>
            This action is for foreign blockchain wallets only (BTC, LTC, DOGE,
            etc.). It does not support QORT transactions.
          </Typography>
        </Box>
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
              onChange={(e) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    coin: e.target.value,
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value={0}>
                <em>No coin selected</em>
              </MenuItem>
              {coins
                ?.filter((item) => item?.name !== "QORT")
                ?.map((coin) => {
                  return (
                    <MenuItem key={coin.name} value={coin.name}>
                      {`${coin.name}`}
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
              Enter one of the supported Qortal coin types.
            </Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">limit</Typography>
            <CustomInput
              type="number"
              placeholder="limit"
              value={requestData.limit}
              name="limit"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Maximum number of transactions to return (default: 10).
            </Typography>
          </Box>
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">offset</Typography>
            <CustomInput
              type="number"
              placeholder="offset"
              value={requestData.offset}
              name="offset"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Number of transactions to skip for pagination (default: 0).
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Get Wallet Transactions"
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
