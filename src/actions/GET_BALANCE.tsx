import { Box, Card, CircularProgress, Typography } from "@mui/material";
import beautify from "js-beautify";
import React, { useMemo, useState } from "react";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import { FieldExplanation } from "../components/QRComponents";
import { Spacer } from "../components/Spacer";

export const formatResponse = (code: string): string => {
  return beautify.js(code, {
    indent_size: 2,
    space_in_empty_paren: true,
  });
};

interface RequestData {
  address: string;
}

export const GET_BALANCE: React.FC = () => {
  const [requestData, setRequestData] = useState<RequestData>({
    address: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codeBlock: string = useMemo(() => {
    return `await qortalRequest({
        action: "GET_BALANCE",
        address: "${requestData?.address}",
      });
    `.trim();
  }, [requestData]);

  const tsInterface: string = useMemo(() => {
    return `
        interface GetBalanceRequest {
           action: string;
           address: string;
        }
        `;
  }, [requestData]);

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await qortalRequest({
        action: "GET_BALANCE",
        address: requestData?.address,
      });
      setResponseData(formatResponse(JSON.stringify(response, null, 2)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div style={{ padding: "10px" }}>
      <Typography variant="body1">
        Get the QORT balance of an address
      </Typography>
      <Spacer height="20px" />

      <Card>
        <Typography variant="h5">Fields</Typography>
        <Spacer height="10px" />
        <Box
          sx={{
            padding: "10px",
            border: "1px solid var(--color3)",
            borderRadius: "5px",
          }}
        >
          <Typography variant="h6">address</Typography>
          <CustomInput
            type="text"
            placeholder="address"
            name="address"
            value={requestData.address}
            onChange={handleChange}
          />
          <Spacer height="10px" />
          <FieldExplanation>
            <Typography>Required field</Typography>
          </FieldExplanation>
        </Box>
        <Spacer height="10px" />

        <Button
          name="Get Balance"
          bgColor="#309ed1"
          onClick={executeQortalRequest}
        />
      </Card>

      <Spacer height="20px" />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ width: "50%" }}>
          <h3>Request</h3>
          <DisplayCode codeBlock={codeBlock} language="javascript" />
          <h3>TS interface</h3>
          <DisplayCode codeBlock={tsInterface} language="javascript" />
        </Box>
        <Box sx={{ width: "50%" }}>
          <h3>Response</h3>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
