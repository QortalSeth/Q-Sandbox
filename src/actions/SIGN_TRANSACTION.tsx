import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
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

interface RequestData {
  unsignedBytes: string;
  process: boolean;
}

interface ComponentProps {
  myAddress?: string;
}

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

export const SIGN_TRANSACTION: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestData, setRequestData] = useState<RequestData>({
    unsignedBytes: "",
    process: false,
  });
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = `
await qortalRequest({
  action: "SIGN_TRANSACTION",
  unsignedBytes: "${requestData?.unsignedBytes}",
  process: ${requestData?.process},
});
`.trim();

  const tsInterface: string = `
interface SignTransactionRequest {
  action: string;
  unsignedBytes: string;
  process?: boolean;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "SIGN_TRANSACTION",
        unsignedBytes: requestData?.unsignedBytes,
        process: requestData?.process,
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
          Use this qortalRequest when you want the flexbility to construct a
          Qortal transaction and get it signed. If not process=true then it will
          return the signed bytes in base58.
        </Typography>
        <Typography variant="body1">
          Needs user approval. This is for advanced usage.
        </Typography>
      </GeneralExplanation>

      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <div className="message-row">
          <Spacer height="5px" />
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">unsignedBytes</Typography>
            <CustomInput
              type="text"
              placeholder="unsignedBytes"
              value={requestData.unsignedBytes}
              name="unsignedBytes"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the unsigned bytes for the transaction. Base58.
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
            <Typography variant="h6">process</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={String(requestData?.process)}
              displayEmpty
              onChange={(e: SelectChangeEvent<string>) =>
                setRequestData((prev) => {
                  return {
                    ...prev,
                    process: e.target.value === "true",
                  };
                })
              }
              sx={{
                width: "300px",
              }}
            >
              <MenuItem value="false">false</MenuItem>

              <MenuItem value="true">true</MenuItem>
            </Select>
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Select true for the qortalRequest to also process the transaction.
              Select false for the qortalRequest to return only the signed
              bytes{" "}
            </Typography>
          </Box>

          <Spacer height="20px" />
          <Button
            name="Execute"
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
