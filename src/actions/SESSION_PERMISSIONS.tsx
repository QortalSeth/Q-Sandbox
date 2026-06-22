import { Box, Card, CircularProgress, styled, Typography } from "@mui/material";

import beautify from "js-beautify";
import React, { useState } from "react";
import Button from "../components/Button";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import { OptionsManager } from "../components/OptionsManager";
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

export const SESSION_PERMISSIONS = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    permissions: [],
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`{
  "success": boolean
}`),
  );

  const codePollName = `
await qortalRequest({
  action: "SESSION_PERMISSIONS",
  ${requestData.permissions.length > 0 ? `permissions: ${JSON.stringify(requestData.permissions)},` : ""}
});
`.trim();

  const tsInterface = `
interface SessionPermissionsRequest {
  action: string;
  permissions?: string[];
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let result = await qortalRequest({
        action: "SESSION_PERMISSIONS",
        ...(requestData.permissions.length > 0 && {
          permissions: requestData.permissions,
        }),
      } as any);

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
          Manage session-based permissions for the current application tab. This
          action allows querying current permissions or setting new permissions
          that persist only for the current session. Session permissions are
          cleared when the tab is closed.
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
            <Typography variant="h6">permissions</Typography>
            <Spacer height="10px" />
            <OptionsManager
              maxLength={10}
              items={requestData.permissions}
              setItems={(items) => {
                setRequestData((prev) => {
                  return {
                    ...prev,
                    permissions: items,
                  };
                });
              }}
            />
            <Spacer height="10px" />
            <FieldExplanation>
              <Typography>Optional field</Typography>
            </FieldExplanation>
            <Spacer height="5px" />
            <Typography>
              Enter a list of permissions to set. Leave empty to query current
              permissions.
            </Typography>
          </Box>
          <Spacer height="20px" />
          <Button
            name="Manage Session Permissions"
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
