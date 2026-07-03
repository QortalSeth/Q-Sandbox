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
import React, { useMemo, useState } from "react";
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
  signature: string;
  includeOnlineSignatures: boolean;
  height: string;
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

export const FETCH_BLOCK: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("signature");

  const [requestData, setRequestData] = useState<RequestData>({
    signature: "",
    includeOnlineSignatures: false,
    height: "",
  });
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = useMemo(() => {
    if (mode === "signature") {
      return `
await qortalRequest({
  action: "FETCH_BLOCK",
  signature: "${requestData?.signature}",
  includeOnlineSignatures: ${requestData?.includeOnlineSignatures}
});
`.trim();
    } else {
      return `
await qortalRequest({
  action: "FETCH_BLOCK",
  height: ${requestData?.height},
  includeOnlineSignatures: ${requestData?.includeOnlineSignatures}
});
`.trim();
    }
  }, [requestData, mode]);

  const tsInterface: string = useMemo(() => {
    if (mode === "signature") {
      return `
interface FetchBlockRequest {
  action: string;
  signature: string;
  includeOnlineSignatures?: boolean;
}
`.trim();
    } else {
      return `
interface FetchBlockRequest {
  action: string;
  height: number;
  includeOnlineSignatures?: boolean;
}
`.trim();
    }
  }, [requestData, mode]);

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "FETCH_BLOCK",
        signature: mode === "height" ? null : requestData?.signature,
        height: mode === "signature" ? null : requestData?.height,
        includeOnlineSignatures: requestData?.includeOnlineSignatures,
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
        <Typography variant="body1">Fetch block by signature</Typography>
      </GeneralExplanation>
      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Modes</Typography>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            outline: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">Fetch by</Typography>
          <Spacer height="10px" />
          <Select
            size="small"
            labelId="label-select-category"
            id="id-select-category"
            value={mode}
            displayEmpty
            onChange={(e: SelectChangeEvent<string>) => setMode(e.target.value)}
            sx={{
              width: "300px",
            }}
          >
            <MenuItem value={"signature"}>Signature</MenuItem>

            <MenuItem value={"height"}>Height</MenuItem>
          </Select>
        </Box>
      </Card>
      <Spacer height="20px" />
      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="5px" />
        <div className="message-row">
          {mode === "signature" && (
            <Box
              sx={{
                padding: "10px",
                outline: "1px solid var(--color3)",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">signature</Typography>
              <CustomInput
                type="text"
                placeholder="signature"
                value={requestData.signature}
                name="signature"
                onChange={handleChange}
              />
              <Spacer height="10px" />
              <FieldExplanation>
                <Typography>Required field</Typography>
              </FieldExplanation>
              <Spacer height="5px" />
              <Typography>Enter a tx signature</Typography>
              <Spacer height="5px" />
            </Box>
          )}
          {mode === "height" && (
            <Box
              sx={{
                padding: "10px",
                outline: "1px solid var(--color3)",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">height</Typography>
              <CustomInput
                type="number"
                placeholder="height"
                value={requestData.height}
                name="height"
                onChange={handleChange}
              />
              <Spacer height="10px" />
              <FieldExplanation>
                <Typography>Required field</Typography>
              </FieldExplanation>
              <Spacer height="5px" />
              <Typography>Enter a block height</Typography>
              <Spacer height="5px" />
            </Box>
          )}

          <Spacer height="5px" />

          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">includeOnlineSignatures</Typography>
            <Spacer height="10px" />
            <Select
              size="small"
              labelId="label-select-category"
              id="id-select-category"
              value={requestData?.includeOnlineSignatures ? "true" : "false"}
              displayEmpty
              onChange={(e: SelectChangeEvent<string>) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    includeOnlineSignatures: e.target.value === "true",
                  };
                });
              }}
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
          </Box>
          <Spacer height="20px" />
          <Button
            name="Fetch Block"
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
