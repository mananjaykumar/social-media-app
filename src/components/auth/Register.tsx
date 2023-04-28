import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Form } from "../reusable/Form";
// import { AlertSnackbar } from "../reusable/AlertSnackbar";
import { DASHBOARD } from "routes/constants";
import { UserData } from "../User";
import { useRegister } from "hooks/auth";

export const Register = () => {
  const { register, isLoading } = useRegister();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
  });
  // const [loading, setLoading] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async () => {
    await register({
      username: userData.username || "",
      email: userData.email,
      password: userData.password,
      redirectTo: DASHBOARD,
    });
  };

  const registerFormProps = {
    title: "Create Your Account",
    btnText: "Submit",
    isLoginForm: false,
    handleSubmit: handleRegister,
    loading: isLoading,
    disabled:
      userData.username === "" ||
      userData.email === "" ||
      userData.password === "",
  };

  return (
    <>
      <Form {...registerFormProps}>
        <TextField
          variant="standard"
          label="Username"
          name="username"
          value={userData.username}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setUserData((prev: UserData) => {
              return {
                ...prev,
                username: event.target.value,
              };
            });
          }}
        />
        <TextField
          variant="standard"
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setUserData((prev: UserData) => {
              return {
                ...prev,
                email: event.target.value,
              };
            });
          }}
        />
        <TextField
          variant="standard"
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setUserData((prev: UserData) => {
              return {
                ...prev,
                password: event.target.value,
              };
            });
          }}
        />
      </Form>
      {/* {errorMsg && (
        <AlertSnackbar
          open={showAlert}
          setOpen={setShowAlert}
          severity="error"
          alertMsg={errorMsg}
        />
      )}
      {successMsg && (
        <AlertSnackbar
          open={showAlert}
          setOpen={setShowAlert}
          severity="success"
          alertMsg={successMsg}
        />
      )} */}
    </>
  );
};
