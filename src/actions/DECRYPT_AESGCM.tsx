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

interface RequestData {
  encryptedData: string;
  iv: string;
  senderPublicKey: string;
}

interface ComponentProps {
  myAddress?: string;
}

export const DECRYPT_AESGCM: React.FC<ComponentProps> = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestData, setRequestData] = useState<RequestData>({
    encryptedData: "",
    iv: "",
    senderPublicKey: "",
  });
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = `
await qortalRequest({
  action: "DECRYPT_AESGCM",
  encryptedData: "${requestData?.encryptedData}",
  iv: "${requestData?.iv}",
  senderPublicKey: "${requestData?.senderPublicKey}"
});
`.trim();

  const tsInterface: string = `
interface DecryptAESGCMRequest {
  action: string;
  encryptedData: string;
  iv: string;
  senderPublicKey: string;
}
`.trim();

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "DECRYPT_AESGCM",
        encryptedData: requestData?.encryptedData,
        iv: requestData?.iv,
        senderPublicKey: requestData?.senderPublicKey,
      } as any);

      setResponseData(formatResponse(JSON.stringify(result)));
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
          Decrypt AES-GCM encrypted data using the sender's public key. This
          action is useful for decrypting messages or data that was encrypted
          specifically for the current user.
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
              Enter the base64-encoded encrypted data to decrypt.
            </Typography>
            <Spacer height="20px" />
            <Typography variant="h6">iv</Typography>
            <CustomInput
              type="text"
              placeholder="iv"
              value={requestData.iv}
              name="iv"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the initialization vector (IV) used for encryption.
            </Typography>
            <Spacer height="20px" />
            <Typography variant="h6">senderPublicKey</Typography>
            <CustomInput
              type="text"
              placeholder="senderPublicKey"
              value={requestData.senderPublicKey}
              name="senderPublicKey"
              onChange={handleChange}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Required field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter the public key of the sender who encrypted the data.
            </Typography>
            <Spacer height="20px" />
            <Button
              name="Decrypt AES-GCM"
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
