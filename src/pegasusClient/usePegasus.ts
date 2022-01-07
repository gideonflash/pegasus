import { useState } from "react";
import { Enquiry, PegasusClientClientConfig } from "./enquiry";

export const usePegasus = (
  config: PegasusClientClientConfig,
  projectName = "default"
) => {
  const [logs, setLog] = useState("Action logs:\n");
  const [enquiry] = useState(
    new Enquiry(config, {
      user: "customer",
    })
  );

  const onNext = () => {
    const message = enquiry.next();
    setLog((prev) => {
      return `${prev}\n${message}`;
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
