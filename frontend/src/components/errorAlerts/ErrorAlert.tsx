import React, { FunctionComponent, ReactElement } from "react";
import { Box } from "@material-ui/core";
import "./ErrorAlert.scss";

export const ErrorAlert: FunctionComponent<{ errorMessage: string, fullPage?: boolean }> = ({
  errorMessage,
  fullPage
}): ReactElement =>  {

  if(fullPage) {
    return (
      <div style={{ width: '100%' }}>
        <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center" alignItems="center">
            <p className="alert">{errorMessage}</p>
        </Box>
      </div>
    )
  }
  return(
    <p className="alert">{errorMessage}</p>
  )
}
