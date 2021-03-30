import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  spinner: {
    position: 'absolute',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    opacity: "1",
    zIndex: 2
  },
}));

const SpinnerOverlay: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={ classes.spinner }>
      <CircularProgress />
    </div>
  );
};



export default SpinnerOverlay;
