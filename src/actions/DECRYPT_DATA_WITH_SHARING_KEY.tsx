import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";

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
  file: File | null;
  encryptedData: string;
  key: string;
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

export const DECRYPT_DATA_WITH_SHARING_KEY: React.FC<ComponentProps> = ({
  myAddress,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestData, setRequestData] = useState<RequestData>({
    file: null,
    encryptedData: "",
    key: "",
  });

  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = useMemo(() => {
    return `
    await qortalRequest({
      action: "DECRYPT_DATA_WITH_SHARING_KEY",
      encryptedData: ${requestData?.encryptedData},
      key: "${requestData?.key}",
    });
    `.trim();
  }, [requestData]);

  const tsInterface: string = useMemo(() => {
    return `
    interface DecryptDataWithSharingKeyRequest {
      action: string;
      encryptedData: string;
      key: string;
    }
    `.trim();
  }, []);

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "DECRYPT_DATA_WITH_SHARING_KEY",
        encryptedData: requestData.encryptedData,
        key: requestData?.key,
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
          Decrypts data that was encrypted with the
          ENCRYPT_DATA_WITH_SHARING_KEY qortalRequest. Use the qortalRequest
          "DECRYPT_DATA" to retrieve the sharing key.
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
            <Typography variant="h6">encryptedData</Typography>
            <CustomInput
              type="text"
              placeholder="encryptedData"
              value={requestData.encryptedData}
              name="encryptedData"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter base64 encrypted data that you want to be decrypted.
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px",
              outline: "1px solid var(--color3)",
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">key</Typography>
            <CustomInput
              type="text"
              placeholder="key"
              value={requestData.key}
              name="key"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter here the sharing key to decrypt the data.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Decrypt Data"
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
