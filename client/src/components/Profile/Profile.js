import { Button, IconButton, makeStyles } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Update from "../updateProfile/Update";
import EditIcon from "@material-ui/icons/Edit";
import { authContext } from "../../context/Auth";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 64,
    padding: 5,

    "& .wallScreenContainer": {
      border: "1px solid white",
      width: 900,
      height: 280,
      margin: "auto",
      backgroundSize: "cover",
      position: "relative",

      "& .profileContainer": {
        padding: "30px 20px",
        width: 250,
        margin: "auto",
        marginTop: 220,
        background: "white",
        borderRadius: "35px 35px 0px 0px",
        boxShadow: "4px 6px 6px #888888",

        "& .profileSubContainer": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",

          "& .profilePicture": {
            height: 100,
            width: 100,
            border: "1px solid",
            borderRadius: 100,
            backgroundColor: "white",
            backgroundSize: "cover",

            "&:hover": {
              cursor: "pointer",
            },
          },

          "& .nameContainerInProfile": {
            marginTop: 30,
          },
        },
      },

      "& .editIconButton": {
        position: "absolute",
        borderRadius: 100,
        background: "white",
        top: 10,
        right: 10,

        "& .MuiIconButton-root": {
          color: "#018786",
          padding: 5,
        },
      },
    },

    "& .userBioContainer": {
      margin: "auto",
      marginTop: 322,
      width: 800,
      minHeight: 150,
      background: "#f3f2ef",
      boxSizing: "border-box",
      padding: 24,
      boxShadow: "2px 2px 3px #888888, -2px -2px 3px 1px white",
    },
  },

  button: {
    width: "100%",
    marginTop: 50,

    "& .MuiButton-root": {
      width: "100%",
    },
  },
}));

export default function ProfileUser({ history }) {
  const { auth, setAuth } = useContext(authContext);
  if (!auth.authenticated) {
    history.push("/");
  }
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [changePic, setChangePic] = useState("");
  const [changeWallPic, setChangeWallPic] = useState("");

  const onClose = () => setOpenDialog(false);

  const avatarClickHandler = () => {
    const input = document.getElementById("avatar");
    input.click();
  };

  const wallImageClickHandler = () => {
    const input = document.getElementById("wallImage");
    input.click();
  };

  const avatarChangeHandler = (e) => {
    const profileImg = e.target.files[0];

    const formData = new FormData();
    formData.append("profileImg", profileImg);

    axios
      .post("/user/profile", formData, {})
      .then((res) => {
        setAuth({
          authenticated: true,
          user: res.data.data,
        });

        setChangePic(res.data.data.avatar.url);
      })
      .catch((err) => console.log(err));
  };

  const wallChangeHandler = (e) => {
    const coverImg = e.target.files[0];

    const formData = new FormData();
    formData.set("coverImg", coverImg);

    axios
      .post("/user/cover", formData, {})
      .then((res) => {
        console.log(res.data);
        setAuth({
          authenticated: true,
          user: res.data.data,
        });
        setChangeWallPic(res.data.data.cover.url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (auth.authenticated) {
      setLoader(false);
      setUser(auth.user);
    } else setUser(null);
  }, [auth, setAuth]);

  if (loader) return <Loader />;

  return (
    <div className={classes.root}>
      <div
        className="wallScreenContainer"
        style={{ backgroundImage: `url(${changeWallPic || user.cover.url})` }}
      >
        <div className="profileContainer">
          <div className="profileSubContainer">
            <div
              className="profilePicture"
              style={{
                backgroundImage: `url(${changePic || user.avatar.url})`,
              }}
              onClick={avatarClickHandler}
            >
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                hidden
                onChange={avatarChangeHandler}
              />
            </div>
            <div className="nameContainerInProfile">
              <div style={{ fontSize: 24, fontWeight: 500 }}>
                {user.firstname} {user.lastname}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, margin: "7px 0px" }}>
                {user.email}
              </div>
              <div style={{ fontSize: 10 }}>{user.username}</div>
            </div>
          </div>
          <div className={classes.button}>
            <Button variant="outlined" onClick={() => setOpenDialog(true)}>
              edit
            </Button>
          </div>
        </div>

        <div className="editIconButton">
          <IconButton onClick={wallImageClickHandler}>
            <EditIcon />
          </IconButton>

          <input
            type="file"
            name="wallImage"
            id="wallImage"
            accept="image/*"
            hidden
            onChange={wallChangeHandler}
          />
        </div>
      </div>

      <div className="userBioContainer">
        <h4 style={{ margin: 0 }}>Bio</h4>
        <p>{user.description}</p>
      </div>

      <Update open={openDialog} onClose={onClose} user={user} />
    </div>
  );
}
