import { useState } from "react";
import { Context, Enquiry, PegasusClientClientConfig } from "./enquiry";

export const usePegasus = (
  config: PegasusClientClientConfig,
  context: Context,
  projectName = "default"
) => {
  const [logs, setLog] = useState("Action logs:\n");
  const [enquiry] = useState(new Enquiry(config, context));

  /**
   * TODO:
   * Use new context on update
   */
  const onNext = () => {
    enquiry.next().then((message) => {
      setLog((prev) => {
        return `${prev}\n${message}`;
      });
    });
  };

  const onBack = () => {
    const message = enquiry.back();
    setLog((prev) => {
      return `${prev}\n${message}`;
    });
  };

  return { currentView: enquiry.curr, logs, onBack, onNext };
};
