/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import LayoutComponent from "./components/Dashboard/Rental/Home/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginSignupPage from "./components/Dashboard/Rental/Pages/Login/LoginSignupPage";
import { useGetTokenMutation } from "./services/configuration/loginApi/getTokenApi";
import { useEffect, useState } from "react";
import { useGetRefreshTokenMutation } from "./services/configuration/loginApi/refreshTokenApi";
import {
  cookieToken,
  getUserType,
  objectToQueryString,
  setCookie,
  tokenAuthenticated,
} from "./constants/constants";
import SignUpForm from "./components/Dashboard/Rental/Pages/Login/SignUpForm";
import { setAuthorizationHeader } from "./store/reducer/userSlice";
import { notification } from "antd";

export interface InputData {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export interface InputRefreshData {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => tokenAuthenticated(0) // this function always check token when component rerender. at initial render we have to update this state.
  );
  const [userType, setUserType] = useState<string | null>(() => getUserType());

  const isRentalUserLoggedIn = isLoggedIn && userType === "Service Provider";

  const [
    getTokenMutation,
    // {
    //   isLoading: isGetTokenLoading,
    //   isError: isGetTokenError,
    //   error: getTokenError,
    // },
  ] = useGetTokenMutation();

  const [
    getRefreshTokenMutation,
    // {
    //   isLoading: isGetTokenLoading,
    //   isError: isGetTokenError,
    //   error: getTokenError,
    // },
  ] = useGetRefreshTokenMutation();

  const getEntryToken = async () => {
    try {
      const inputData: InputData = {
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
        grant_type: import.meta.env.VITE_GRANT_TYPE,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
      };

      const formDataQueryString = objectToQueryString(inputData);
      const res = await getTokenMutation(formDataQueryString);

      if (
        "data" in res &&
        "access_token" in res.data &&
        "expires_in" in res.data
      ) {
        // Save the access token and its expiration time
        const accessToken = res.data.access_token;
        setAuthorizationHeader(accessToken);
        localStorage.setItem("access_token", accessToken);
      } else {
        console.error("Unexpected response format:", res);
        notification.error({
          message: "Authentication Failed",
        });
      }
    } catch (err) {
      console.error("Error fetching token:", err);
      notification.error({
        message: "Authentication Failed",
      });
    }
  };

  const getRefreshToken = async () => {
    try {
      const storedRefreshToken = cookieToken(1);

      if (storedRefreshToken === null) {
        notification.error({
          message: "Refresh token not found",
        });
        return;
      }

      const inputData: InputRefreshData = {
        grant_type: import.meta.env.VITE_CLIENT_TYPE_REFRESH_TOKEN,
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        refresh_token: storedRefreshToken,
      };

      const formDataQueryString = objectToQueryString(inputData);
      const res = await getRefreshTokenMutation(formDataQueryString);

      if (
        "data" in res &&
        "access_token" in res.data &&
        "refresh_token" in res.data
      ) {
        const access_token = res.data.access_token;
        const expires_in = res.data.expires_in;
        const refresh_expires_in = res.data.refresh_expires_in;
        const refresh_token = res.data.refresh_token;

        setCookie(
          import.meta.env.VITE_RENTAL_ACCESS_TOKEN_NAME,
          access_token,
          expires_in
        );
        setCookie(
          import.meta.env.VITE_RENTAL_REFRESH_TOKEN_NAME,
          refresh_token,
          refresh_expires_in
        );
      } else {
        notification.error({
          message: "Refresh Token Error",
        });
      }
    } catch (err) {
      notification.error({
        message: "Authentication Failed",
      });
    }
  };

  useEffect(() => {
    getEntryToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      // getRefreshToken();
      const fiveMinutes = 5 * 60 * 1000;
      const interval = setInterval(() => {
        getRefreshToken();
      }, fiveMinutes);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* rental user */}
          <Route
            index
            path="/"
            element={
              <LoginSignupPage
                setIsLoggedIn={setIsLoggedIn}
                setUserType={setUserType}
              />
            }
          />
          <Route
            index
            path="/service-user-login"
            element={
              <LoginSignupPage
                setIsLoggedIn={setIsLoggedIn}
                setUserType={setUserType}
              />
            }
          />
          <Route index path="/service-user-signup" element={<SignUpForm />} />

          <Route
            path="/*"
            element={
              isRentalUserLoggedIn ? (
                <LayoutComponent setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/service-user-login" replace={true} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
