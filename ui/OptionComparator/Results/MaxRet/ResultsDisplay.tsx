import React from "react";
import { useSelector } from "react-redux";
import MaxRetResultLoader from "./MaxRetResultLoader";

export default () => {
  const results = useSelector((state) => state.optionComp.results);

  if (results.length > 0) {
    return renderDisplay();
  }

  return <MaxRetResultLoader>{renderDisplay()}</MaxRetResultLoader>;
  function renderDisplay() {
    return <></>;
  }
};
