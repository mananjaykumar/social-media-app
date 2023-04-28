import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useEffect, useState } from "react";
import { DASHBOARD, LOGIN } from "routes/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { AlertSnackbar } from "components/reusable/AlertSnackbar";
import { useNavigate } from "react-router-dom";
import isUserNameExists from "utils/isUserNameExists";

export const useAuth = () => {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (authUser) {
        const ref = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(ref);
        setUser(docSnap.data());
        setLoading(false);
      }
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not logged In
    }
  }, [authLoading, authUser]);

  // const authUser1 = {
  //   id: "2385",
  //   username: "mananjay82i",
  //   avatar:
  //     "data:image/jpeg;base64,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",
  // };
  // const authUser2 = {
  //   id: "296285",
  //   username: "rishabsinha",
  //   avatar:
  //     "data:image/jpeg;base64,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",
  // };

  return {
    user: user,
    isLoading,
    error,
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);

  async function login({
    email,
    password,
    redirectTo = DASHBOARD,
  }: {
    email: string;
    password: string;
    redirectTo: string;
  }) {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      <AlertSnackbar
        open={open}
        setOpen={setOpen}
        severity="success"
        alertMsg="User SuccessFully Logged In"
      />;
      navigate(redirectTo);
    } catch (error: any) {
      <AlertSnackbar
        open={open}
        setOpen={setOpen}
        severity="error"
        alertMsg={error.message}
      />;
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
    return true;
  }

  return {
    login,
    isLoading,
  };
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async ({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }: {
    username: string;
    email: string;
    password: string;
    redirectTo: string;
  }) => {
    setIsLoading(true);
    const userNameExists = await isUserNameExists(username);

    if (userNameExists) {
      // toast user already exists

      setIsLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        //toast account created

        navigate(redirectTo);
      } catch (error) {
        // toast registeration failed
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { register, isLoading };
};

export function useLogout() {
  const [signOut, isLoading] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      //toast

      navigate(LOGIN);
    } // else : show error [signOut() returns false if failed]
  }

  return { logout, isLoading };
}
