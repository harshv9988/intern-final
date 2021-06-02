import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import email from "../../assets/images/emailVerification/email2.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    zIndex: 500000,
    background: "white",
    display: "flex",
  },

  container: {
    margin: "auto",
    width: "fit-content",
    textAlign: "center",

    "& .verificationButton": {
      background: "#6a6ac1",
      color: "white",
      fontSize: 18,
      fontWeight: 500,
      textTransform: "capitalize",
      minWidth: 144,
      minHeight: 41,

      "& .MuiCircularProgress-root": {
        height: "24px !important",
        width: "24px !important",
        color: "#FFFFFF",
      },
    },
  },

  text: {
    fontSize: 28,
    lineHeight: "24px",
    letterSpacing: 0.2,
    fontWeight: 500,
    marginBottom: 25,
  },
}));

export default function EmailVerification(props) {
  const id = props.match.params.id;
  const classes = useStyles();
  const [verified, setVerified] = useState(false);
  const [loader, setLoader] = useState(false);
  const alert = useAlert();

  const clickHandler = () => {
    setLoader(true);
    axios({
      method: "post",
      url: `/user/verify?id=${id}`,
    })
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (res.data.success) {
          setVerified(true);
          alert.success("Verified SuccessFully");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div>
          <img src={email} alt="" srcset="" style={{ width: "30%" }} />
        </div>

        <div className={classes.text}>
          Click this Button to verify your Email Address
        </div>
        <div>
          <Button
            variant="contained"
            className="verificationButton"
            onClick={clickHandler}
          >
            {verified ? (
              "Email is Verified"
            ) : loader ? (
              <CircularProgress />
            ) : (
              "Verify Your Email"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
