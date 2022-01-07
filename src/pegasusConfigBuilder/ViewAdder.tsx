import React, { useState } from "react";
import { Button, Box, TextInput } from "@feast-it/pesto";

interface AdderProps {
  addViewToConfig: (viewName: string) => void;
  errMsg: string;
}
export const ViewAdder = ({ addViewToConfig, errMsg }: AdderProps) => {
  const [viewName, setViewName] = useState("");

  return (
    <Box>
      <Button
        size="small"
        mr={4}
        display={{ m: "inline-block" }}
        onClick={() => {
          addViewToConfig(viewName);
        }}
      >
        Add view
      </Button>
      <TextInput
        placeholder="Enter your name"
        name="sizes-m"
        value={viewName}
        onChange={(newValue: React.SetStateAction<string>) =>
          setViewName(newValue)
        }
        width={300}
        variant="standard"
        size="m"
        display={{ m: "inline-block" }}
        error={errMsg && errMsg}
      />
    </Box>
  );
};
