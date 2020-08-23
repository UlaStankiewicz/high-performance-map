import { Box, CircularProgress } from "@material-ui/core";
import React, { FunctionComponent, ReactElement } from "react";


export const LoadingBar: FunctionComponent = (): ReactElement => (
    <div style={{ width: '100%', height: '800px' }}>
        <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center" alignItems="center">
            <CircularProgress disableShrink />
        </Box>
    </div>
);