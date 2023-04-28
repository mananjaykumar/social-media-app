import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
// import { AlertSnackbar } from "../reusable/AlertSnackbar";
import { Form } from "../reusable/Form";
import { DASHBOARD } from "../../routes/constants";
import { UserData } from "../User";
import { useAuth, useLogin } from "hooks/auth";
import { Loader } from "components/reusable/Loader";

export const Login = () => {
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useAuth();
  const { login, isLoading } = useLogin();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  // const [loading, setLoading] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async () => {
    const succeded = await login({
      email: userData.email,
      password: userData.password,
      redirectTo: DASHBOARD,
    });

    if (succeded) setUserData({ email: "", password: "" });
  };

  const loginFormProps = {
    title: "Login",
    btnText: "Submit",
    isLoginForm: true,
    handleSubmit: handleLogin,
    loading: isLoading,
    disabled: userData.email === "" || userData.password === "",
  };

  if (userLoading) return <Loader />;
  if (!userLoading && user) navigate(DASHBOARD);

  return (
    <>
      <Form {...loginFormProps}>
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
