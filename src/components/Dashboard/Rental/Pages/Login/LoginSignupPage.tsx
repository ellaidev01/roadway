/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../../../../index.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import { Col, Row, Typography } from "antd";
import vehicle from "../../../../../assets/vehicle.png";
import LoginForm from "./LoginForm";
import { useGetTokenMutation } from "../../../../../services/configuration/loginApi/getTokenApi";
import {
  setCookie,
  tokenAuthenticated,
} from "../../../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  UserReducer,
  getUserByMobileRequest,
} from "../../../../../store/reducer/userSlice";
import { RootStateType } from "../../../../../store/store";
import { Dispatch, SetStateAction } from "react";

interface InputData {
  username: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}

type FormValues = {
  mobile: string;
  password: string;
};

interface loginProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserType: Dispatch<SetStateAction<string | null>>
}

const LoginSignupPage: React.FC<loginProps> = ({ setIsLoggedIn,setUserType }) => {
  const [isLoginClicked, setIsLoginClicked] = useState<boolean>(true);
  const [mobileNo, setMobileNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { userType } = useSelector<RootStateType, UserReducer>(
    (state) => state.user
  );

  // console.log(userType);
  

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [
    getTokenMutation,
    // {
    //   isLoading: isGetTokenLoading,
    //   isError: isGetTokenError,
    //   error: getTokenError,
    // },
  ] = useGetTokenMutation();

  const login = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token && mobileNo.length === 10) {
        const res = await dispatch(getUserByMobileRequest(mobileNo));
        const username = res?.payload[0].uniqueid;
        localStorage.setItem("usertype", res?.payload[0].usertype);
        setUserType(res?.payload[0].usertype);
        
        if (username && password) {
          const inputData = {
            username: username,
            password: password,
            grant_type: import.meta.env.VITE_GRANT_TYPE,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
          };

          // Create a query string from the input data
          const formDataQueryString = Object.keys(inputData)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  inputData[key as keyof InputData]
                )}`
            )
            .join("&");

          const res = await getTokenMutation(formDataQueryString);

          // Check if the response contains the expected data
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
            setIsLoggedIn(tokenAuthenticated(0));
            navigate("/service-list");
          } else {
            console.error("Unexpected response format:", res);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching token:", err);
    }
  };

  const handleLoginChange = (_: FormValues, allValues: FormValues) => {
    const { mobile, password } = allValues;
    setMobileNo(mobile);
    setPassword(password);
  };

  const onFinish = async () => {
    await login();
  };

  const handleLoginBtn = () => {
    setIsLoginClicked(!isLoginClicked);
  };

  return (
    <>
      <div className="h-screen ">
        <div className="h-[200px] rectangle">
          <div>
            <Row>
              <Col className="flex justify-left items-center" span={16}>
                <Typography className="ml-8 italic mt-10 md:mt-2  text-white text-2xl font-extrabold">
                  RoadWays Info Services
                </Typography>
              </Col>
              <Col className="flex justify-center items-center" span={8}>
                <Typography className="mx-8 my-4 text-white hidden md:block">
                  Help
                </Typography>
                <Typography className="mr-4 mb-7 md:mt-7  text-white">
                  Contact-Us
                </Typography>
              </Col>
            </Row>
          </div>
        </div>
        <div className="relative">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={10} lg={12} xl={12}>
              <div className="hidden md:block absolute -top-[320px] w-[700px]">
                <img className="vehcleimg w-full" src={vehicle} alt="vehicle" />
              </div>
              <div className="hidden md:block absolute top-[220px]">
                <Typography className="text-justify ml-4">
                  Welcome to RoadWays Info Services, your trusted companion for
                  all your vehicle rental needs. We understand the importance of
                  reliable transportation, and we're here to make your journey
                  smoother. Our platform offers a wide range of vehicles to
                  cater to various travel preferences. Whether you're planning a
                  family road trip, a corporate event, or a group excursion, we
                  have the perfect vehicle for you. With RoadWays Info,
                  convenience is at your fingertips. Log in to your account to
                  access our user-friendly interface, where you can browse our
                  extensive catalog of vehicles. We provide detailed
                  descriptions and images to help you make the right choice.
                </Typography>
              </div>
            </Col>

            {isLoginClicked && (
              <LoginForm
                handleLoginBtn={handleLoginBtn}
                handleLoginChange={handleLoginChange}
                onFinish={onFinish}
              />
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default LoginSignupPage;
