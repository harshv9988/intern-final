import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import { authContext } from "../../context/Auth";

function LandingPage({ history }) {
  const { auth, setAuth } = useContext(authContext);
  if (auth.authenticated) {
    history.push("/profile");
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        fontSize: 50,
        fontFamily: "sans-serif",
      }}
    >
      Pritam Nursery task
    </Box>
  );
}

export default LandingPage;
