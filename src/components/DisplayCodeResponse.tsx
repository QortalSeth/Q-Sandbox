import { Box, Typography, useTheme } from "@mui/material";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import type { Key } from "react";
import { CodeWrapper, DisplayCodeResponsePre } from "./Common-styles";

export const DisplayCodeResponse = ({ codeBlock, language = "javascript" }) => {
  const theme = useTheme();

  const [copyText, setCopyText] = useState("Copy");

  return (
    <CodeWrapper>
      <Highlight
        theme={themes.palenight}
        code={codeBlock}
        language="javascript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <DisplayCodeResponsePre
            className={`${className} stripe-code-block`}
            style={{ ...style, margin: 0 }}
          >
            <Box
              sx={{
                padding: "5px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#767ea0" : "#d3d9e1",
                color: theme.palette.text.primary,
                borderTopRightRadius: "7px",
                borderTopLeftRadius: "7px",
                marginBottom: "10px",
              }}
            >
              <Typography>RESPONSE</Typography>
            </Box>

            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              const { key: lineKey, ...restLineProps } = lineProps;
              return (
                <div
                  key={lineKey as Key}
                  {...restLineProps}
                  style={{ display: "flex" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      userSelect: "none",
                      opacity: "0.5",
                      marginRight: "8px",
                      fontSize: "16px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ flex: 1, fontSize: "18px" }}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key });
                      const { key: tokenKey, ...restTokenProps } = tokenProps;
                      return <span key={tokenKey as Key} {...restTokenProps} />;
                    })}
                  </span>
                </div>
              );
            })}
          </DisplayCodeResponsePre>
        )}
      </Highlight>
    </CodeWrapper>
  );
};
