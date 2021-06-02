import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LoginWithGoogle from "../Login/GoogleLogin";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 440,
    minWidth: 300,
    height: "100%",
    background: "#6a6ac1",
    // padding: '52px 64px',
    // boxSizing: 'border-box',

    // [theme.breakpoints.down(1044)]: {
    //   width: '100%',
    //   height: 279,
    //   padding: '48px 64px',

    //   '& > div': {
    //     width: 392,
    //     margin: 'auto',
    //   },
  },
  googleHolder: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "50%",
  },
}));

export default function Aside({ onClose }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.googleHolder}>
        <h3 style={{ color: "white" }}>SignIn/SignUp with Google</h3>
        <div>
          <LoginWithGoogle onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
