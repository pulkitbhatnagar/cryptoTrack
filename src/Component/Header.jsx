import React, { useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  MenuItem,
  Select,
  Grid,
  Button,
  Modal,
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import UserDetails from "./UserDetails";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Pages/Firebase";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const Header = () => {
  const { currency, setCurrency, user, setAlert } = CryptoState();
  const [modal, setModal] = useState(false);
  let history = useNavigate();
  const [value, setValue] = useState("0");

  function handleClose() {
    setModal((prev) => !prev);
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function modalSection() {
    const handletabChange = (event, newValue) => {
      setValue(newValue);
    };

    const googleSignInParam = new GoogleAuthProvider();

    function googleSignIn() {
      

      signInWithPopup(auth, googleSignInParam)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
        //   const credential = GoogleAuthProvider.credentialFromResult(result);
        //   const token = credential.accessToken;
        //   // The signed-in user info.
        //   const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          handleClose();
          setAlert({
            open: true,
            severity: "success",
            message: "Logged In successfully",
          });
        })
        .catch((error) => {
          // Handle Errors here.
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // The email of the user's account used.
        //   const email = error.customData.email;
        //   // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          setAlert({
            open: true,
            severity: "error",
            message: "Somrthing went wrong",
          });
        });
    }
    return (
      <ThemeProvider theme={darkTheme}>
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: {
                xs: "250px",
                sm: "400px",
              },
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handletabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="LOGIN" value="0" />
                <Tab label="SIGN UP" value="1" />
              </Tabs>
            </Box>
            {value === "0" && <Login handleCloseModal={handleClose} />}
            {value === "1" && <SignUp handleCloseModal={handleClose} />}
            <Grid
              sx={{
                color: "white",
                m: "10px",
                textAlign: "center",
              }}
            >
              OR
            </Grid>
            <Grid sx={{ width: "100%" }}>
              <GoogleButton
                onClick={() => {
                  googleSignIn();
                }}
                style={{ width: "100%", p: 1 }}
              />
            </Grid>
          </Box>
        </Modal>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar component="nav" position="static">
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  flex: 1,
                  color: "#fccb06",
                  cursor: "pointer",
                }}
                onClick={() => history("/")}
              >
                Crypto Tracker
              </Typography>
            </Grid>
            <Grid sx={{ padding: "10px", display: "flex" }}>
              <Select
                variant="outlined"
                sx={{ width: "100px" }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
              {user ? (
                <Button variant="filled" sx={{ ml: "10px" }}>
                  <UserDetails />
                </Button>
              ) : (
                <Button
                  variant="filled"
                  sx={{ ml: "10px" }}
                  onClick={() => setModal((prev) => !prev)}
                >
                  Login
                </Button>
              )}
            </Grid>
          </Toolbar>
          {modalSection()}
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
