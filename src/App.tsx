import React, { useState } from "react";
import { ThemeProvider } from "emotion-theming";
import { base, Heading, Text, Grid, Box } from "@feast-it/pesto";

import { PegasusClientClientConfig } from "./pegasusClient/sequenceRunner";
import { ConfigCreator } from "./pegasusConfigBuilder/ConfigCreator";
import { Preview } from "./pegasusWorkSpaces/TahiniEnquiryForm/Preview";

function App() {
  const [config, setConfig] = useState<PegasusClientClientConfig | null>(null);

  return (
    <div className="App">
      <ThemeProvider theme={base}>
        <Box p={5}>
          <Heading fontSize={{ _: "headingLargeMobile", m: "headingLarge" }}>
            Pegasus
          </Heading>
          <Grid gridTemplateColumns={{ m: "1fr 25%" }} gridGap={10}>
            {config ? (
              <Preview config={config} />
            ) : (
              <Text color="primary"> Waiting on valid config</Text>
            )}
            <ConfigCreator onValidConfig={setConfig} />
          </Grid>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
