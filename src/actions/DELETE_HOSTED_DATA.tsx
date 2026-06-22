import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Button as MuiButton,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from "@mui/material";

import beautify from "js-beautify";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../components/Button";
import { CustomInput } from "../components/Common-styles";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { services } from "../constants";

interface RequestData {
  service: string;
  identifier: string;
  name: string;
}

interface Resource {
  service: string;
  identifier: string;
  name: string;
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

export const DELETE_HOSTED_DATA: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [requestData, setRequestData] = useState<RequestData>({
    service: "DOCUMENT",
    identifier: "",
    name: "",
  });
  const [dataType, setDataType] = useState<string>("file");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: async (acceptedFiles: File[]) => {
      const fileSelected = acceptedFiles[0];
      if (fileSelected) {
        setFile(fileSelected);
      }
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
  const [isOpenAddResource, setIsOpenAddResource] = useState<boolean>(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<string>(formatResponse(``));

  const codePollName: string = useMemo(() => {
    return `await qortalRequest({
    action: "DELETE_HOSTED_DATA",
    hostedData: ${JSON.stringify(resources)}
  });
  `.trim();
  }, [requestData, resources]);

  const tsInterface: string = useMemo(() => {
    return `
      interface DeleteHostedDataRequest {
        action: string;
        hostedData: any[];
      }
      `;
  }, [requestData, file, isEncrypted, dataType]);

  const addtoResources = async (): Promise<void> => {
    try {
      let resource: Resource = {
        service: requestData?.service,
        identifier: requestData?.identifier,
        name: requestData?.name,
      };

      setResources((prev) => [...prev, resource]);
      setRequestData({
        service: "DOCUMENT",
        identifier: "",
        name: "",
      });
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const executeQortalRequest = async (): Promise<void> => {
    try {
      setIsLoading(true);

      let account = await qortalRequest({
        action: "DELETE_HOSTED_DATA",
        hostedData: resources,
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
          Use this qortalRequest to delete a list of hosted data.
        </Typography>
        <Typography variant="body1">Needs user approval</Typography>
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
            This qortalRequest cannot be used through the gateway.
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
            <Typography variant="h6">hostedData</Typography>
            <Spacer height="10px" />
            {resources?.map((resource, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Typography>{resource?.identifier}</Typography>
                  <MuiButton
                    onClick={() => {
                      setResources((prev) => {
                        const copyPrev = [...prev];
                        copyPrev.splice(index, 1);
                        return copyPrev;
                      });
                    }}
                  >
                    Remove resource from list
                  </MuiButton>
                </Box>
              );
            })}
            <Spacer height="10px" />
            <MuiButton
              onClick={() => {
                setIsOpenAddResource(true);
              }}
              variant="contained"
            >
              Add hosted data
            </MuiButton>
            <Spacer height="5px" />
            <Typography>
              hostedData field takes in a list of hosted data
            </Typography>
          </Box>
          <Spacer height="10px" />

          <Button
            name="Publish"
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
      <Dialog
        open={isOpenAddResource}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add data</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Spacer height="20px" />

            <Card>
              <Typography variant="h5">Fields</Typography>
              <Button
                onClick={() => {
                  setIsOpenAddResource(true);
                }}
              >
                Add resource
              </Button>
              <Spacer height="5px" />
              <div className="message-row">
                <Box
                  sx={{
                    padding: "10px",
                    outline: "1px solid var(--color3)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6">service</Typography>
                  <Spacer height="10px" />
                  <Select
                    size="small"
                    labelId="label-select-category"
                    id="id-select-category"
                    value={requestData?.service}
                    displayEmpty
                    onChange={(e: SelectChangeEvent<string>) =>
                      setRequestData((prev) => {
                        return {
                          ...prev,
                          service: e.target.value,
                        };
                      })
                    }
                    sx={{
                      width: "300px",
                    }}
                  >
                    <MenuItem value={0}>
                      <em>No service selected</em>
                    </MenuItem>
                    {services?.map((service) => {
                      return (
                        <MenuItem key={service.name} value={service.name}>
                          {`${service.name} - max ${service.sizeLabel}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Spacer height="10px" />
                <Box
                  sx={{
                    padding: "10px",
                    outline: "1px solid var(--color3)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6">identifier</Typography>
                  <Spacer height="10px" />
                  <CustomInput
                    type="text"
                    placeholder="identifier"
                    value={requestData.identifier}
                    name="identifier"
                    onChange={handleChange}
                  />
                  <Spacer height="10px" />
                  <FieldExplanation>
                    <Typography>Required field</Typography>
                  </FieldExplanation>
                  <Spacer height="5px" />
                  <Typography>Enter an identifier</Typography>
                </Box>

                <Spacer height="10px" />
                <Box
                  sx={{
                    padding: "10px",
                    outline: "1px solid var(--color3)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography variant="h6">name</Typography>
                  <Spacer height="10px" />
                  <CustomInput
                    type="text"
                    placeholder="name"
                    value={requestData.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <Spacer height="10px" />
                  <FieldExplanation>
                    <Typography>Required field.</Typography>
                  </FieldExplanation>
                </Box>
                <Spacer height="10px" />
              </div>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions>
          <MuiButton
            variant="contained"
            onClick={() => {
              setIsOpenAddResource(false);
            }}
          >
            Close
          </MuiButton>

          <MuiButton
            variant="contained"
            onClick={() => {
              addtoResources();
            }}
          >
            Add to resources list
          </MuiButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
