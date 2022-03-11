import { useState } from "react";
import {
  Context,
  SequenceRunner,
  PegasusClientClientConfig,
} from "./sequenceRunner";

export const usePegasus = (
  config: PegasusClientClientConfig,
  context: Context,
  projectName = "default"
) => {
  const [logs, setLog] = useState("Action logs:\n");
  const [enquiry] = useState(new SequenceRunner(config, context));

  const onNext = () => {
    enquiry.next(context).then((message) => {
      setLog((prev) => {
        return `${prev}\n${message}`;
      });
    });
  };

  const onBack = () => {
    const message = enquiry.back(context);
    setLog((prev) => {
      return `${prev}\n${message}`;
    });
  };

  return { currentView: enquiry.curr, logs, onBack, onNext };
};
