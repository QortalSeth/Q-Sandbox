import React from "react";
import { FunctionDocBlockClear } from "../../../components/FunctionDocBlockClear";
import { Spacer } from "../../../components/Spacer";
import { DocContainer } from "../../components/Containers";
import { SectionTitle } from "../../components/Texts";

const code1 = `
const data = {
  title: "my title"
}

const dataToBase = await objectToBase64(data);    
`.trim();

export const DataTransformation = () => {
  return (
    <DocContainer>
      <SectionTitle variant="h1">Data Transformation</SectionTitle>
      <Spacer height="25px" />
      <FunctionDocBlockClear
        name="objectToBase64"
        signature="objectToBase64(obj)"
        isAsync
        importStatement={`import { objectToBase64 } from 'qapp-core'`}
        description="Converts a JavaScript object to a base64-encoded JSON string. Useful for embedding structured data in QDN or other text-based formats."
        params={[
          {
            name: "obj",
            type: "object",
            required: true,
            description:
              "The object to convert into a base64-encoded JSON string.",
          },
        ]}
        returnType={{
          type: "Promise<string>",
          description: "The base64-encoded string of the input object.",
        }}
        codeblock={code1}
      />
      <FunctionDocBlockClear
        name="base64ToObject"
        signature="base64ToObject(base64)"
        importStatement={`import { base64ToObject } from 'qapp-core'`}
        description="Decodes a base64-encoded JSON string back into its original JavaScript object. Internally converts base64 → Uint8Array → Object."
        params={[
          {
            name: "base64",
            type: "string",
            required: true,
            description: "A base64-encoded string representing a JSON object.",
          },
        ]}
        returnType={{
          type: "object",
          description: "The decoded JavaScript object.",
        }}
      />
    </DocContainer>
  );
};