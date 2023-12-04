import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import { Col, Row, Typography } from "antd";
import CustomSignUpFormItem, {
  SignUpInputData,
} from "../../Custom/CustomSignUpFormItem";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useGetUserTypeDataQuery,
  useGetCitiesDataQuery,
  useGetCountriesDataQuery,
  useGetStatesDataQuery,
  useSignUpMutation,
} from "../../../../../services/configuration/signupApi/signUpApi";
// import axios from "axios";
import vehicle from "../../../../../assets/vehicle.png";
import { Link } from "react-router-dom";
// import axios from "axios";

export type CityData = {
  country_code: string;
  country_id: number;
  country_name: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state_code: string;
  state_id: number;
  state_name: string;
  wikidataid: string;
};

export type StateData = {
  country_code: string;
  country_id: number;
  country_name: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state_code: string;
  type: string;
};

export type CountryData = {
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  emoji: string;
  emojiu: string;
  id: number;
  iso2: string;
  iso3: string;
  latitude: number;
  longitude: number;
  name: string;
  nationality: string;
  native: string;
  numeric_code: number;
  phone_code: string;
  region: string;
  region_id: number;
  subregion: string;
  subregion_id: number;
  timezones: string; // Note: It's a string, consider parsing it into an array of objects if needed
  tld: string;
};

const SignUpForm = () => {
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  const [signUpFormData, setSignUpFormData] = useState<SignUpInputData>();
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>();
  const [isTermsSelected, setIsTermSelected] = useState<boolean>();
  const [termsError, setTermsError] = useState<string>("");
  // const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );

  const [signUpForm] = Form.useForm();

  const {
    data: countriesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetCountriesDataQuery(undefined); // undefined means there is no argument supplied for request

  const {
    data: statesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetStatesDataQuery(selectedCountryCode || "IN"); // undefined means there is no argument supplied for request

  const {
    data: citiesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetCitiesDataQuery(selectedStateCode || "TN"); // undefined means there is no argument supplied for request

  const {
    data: userTypesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetUserTypeDataQuery(undefined); // undefined means there is no argument supplied for request

  const [
    signUpRequest,
    // { isError: isSignUpError, isLoading: isSignUpLoading, error: SignUpError },
  ] = useSignUpMutation();

  const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the input value
    let inputValue: string = e.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Ensure the length doesn't exceed 10 characters
    if (inputValue.length > 10) {
      // remove the extra characters when type
      inputValue = inputValue.slice(0, 10); // index , upto
    }

    // Update the state
    setMobileNumber(inputValue);
  };

  useEffect(() => {
    if (otp) {
      setOtpError("");
    }
    if (mobileNumber) {
      setMobileError("");
    }
  }, [otp, mobileNumber]);

  const handleChangeSignUpForm = (changedField: SignUpInputData) => {
    const countryCode = countriesResData?.find(
      (item: CountryData) => item?.name === changedField?.country
    );

    const stateCode = statesResData?.find(
      (item: StateData) => item?.name === changedField?.state
    );

    setSelectedCountryCode(countryCode?.iso2);
    setSelectedStateCode(stateCode?.state_code);

    setSignUpFormData((prevState) => ({
      ...prevState,
      ...changedField,
    }));
  };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   setSelectedFile(file?.name || null);
  //   console.log(file?.name);
  //   console.log(selectedFile);
  // };

  const handleNext = () => {
    signUpForm.validateFields().then(() => {
      if (mobileNumber?.length < 10) {
        setMobileError("Mobile number should be at least 10 characters");
      } else {
        setShowAddressDetails(true);
      }
    });
    if (!mobileNumber) {
      setMobileError("Mobile number is required");
    }
  };

  const handleBack = () => {
    setShowAddressDetails(false);
  };

  const handleTerms = () => {
    setIsTermSelected(!isTermsSelected);
  };

  const onFinish = async () => {
    const userType = userTypesResData[1]?.value;

    const formData = {
      name: signUpFormData?.name,
      mobile_no: mobileNumber,
      email: signUpFormData?.email,
      addr: `${signUpFormData?.door_no},${signUpFormData?.street_name},${signUpFormData?.landmark}`,
      city: signUpFormData?.city,
      state: signUpFormData?.state,
      country: signUpFormData?.country,
      password: signUpFormData?.password,
      usertype: userType,
      latitude: "",
      longitude: "",
      idtype: signUpFormData?.idtype,
      idnumber: signUpFormData?.idnumber,
      idfile: "",
      // organization_name: signUpFormData?.organization_name,
    };

    console.log(formData);

    if (!isTermsSelected) {
      setTermsError("terms and conditions is not selected");
      notification.success({
        message: "Error",
        description: "terms and conditions is not selected!",
      });
    } else {
      await signUpRequest(formData);
      setIsFormSubmitted(true);
      notification.success({
        message: "Success",
        description: "Your details submitted successfully!",
      });

      // const username = "praveen";
      // const password = "kumar@123";

      // const credentials = `${username}:${password}`;
      // const base64Credentials = btoa(credentials);

      // const headers = {
      //   "Content-Type": "application/json", // Adjust content type as needed
      //   Authorization: `Basic ${base64Credentials}`,
      // };

      // const apiUrl = "https://api.teckiko.com/gord/insert";

      // // Make the POST request using Axios
      // const response = await axios.post(apiUrl, formData, {headers});
      // console.log(response);

      //   const myHeaders = new Headers();
      //   myHeaders.append("Content-Type", "application/json");
      //   myHeaders.append("Authorization", "Basic cHJhdmVlbjprdW1hckAxMjM=");

      //   const raw = JSON.stringify(formData);

      //   const requestOptions = {
      //     method: "POST",
      //     headers: myHeaders,
      //     body: raw,
      //   };

      //   fetch("https://api.teckiko.com/gord/insert", requestOptions)
      //     .then((response) => response.text())
      //     .then((result) => console.log(result))
      //     .catch((error) => console.log("error", error));
      // }
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    // in html and js e.target.value property of an input field with type="number" will still be a string. This is because the user can input constious characters, not just numbers, and it needs to be parsed into a number explicitly.

    // Get the input value
    let inputValue: string = e.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/[^0-9]/g, "");

    // Ensure the length doesn't exceed 10 characters
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6); // index , upto
    }

    // Update the state
    setOtp(inputValue);
  };

  const handleOtpSubmit = () => {
    if (!otp) {
      setOtpError("Please Enter Received OTP ");
    }

    if (otp?.length && otp.length < 6) {
      setOtpError("OTP should be of minimum 6 digits");
    }

    if (otp && otp?.length) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic cHJhdmVlbjprdW1hckAxMjM=");

      const raw = JSON.stringify({
        mobile: mobileNumber,
        email: signUpFormData?.email,
        otp: otp,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("https://api.teckiko.com/gord/verifyotp", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="h-screen ">
      <div className="h-[200px] rectangle">
        <div>
          <Row>
            <Col className="flex justify-left items-center" span={16}>
              <Typography className="ml-8 italic mt-10 md:mt-2  text-white text-2xl font-extrabold">
                RoadWays Services
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
                smoother. Our platform offers a wide range of vehicles to cater
                to constious travel preferences. Whether you're planning a
                family road trip, a corporate event, or a group excursion, we
                have the perfect vehicle for you. With RoadWays Info,
                convenience is at your fingertips. Log in to your account to
                access our user-friendly interface, where you can browse our
                extensive catalog of vehicles. We provide detailed descriptions
                and images to help you make the right choice.
              </Typography>
            </div>
          </Col>

          <Col>
            <div className="logBox w-[280px] md:w-[615px] bg-white py-2 m-10 absolute  -top-[124px] rounded-md">
              <Typography
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="text-center text-xl mt-6 mb-0 "
              >
                SignUp
              </Typography>
              <Divider />

              <div className="bg-white px-10 pb-6  rounded-md">
                <Form
                  name="signUp"
                  className="signUp-form"
                  onFinish={onFinish}
                  form={signUpForm}
                  size="large"
                  onValuesChange={handleChangeSignUpForm}
                >
                  {!showAddressDetails && (
                    <div>
                      <p className="pb-2 pl-3 text-lg">
                        Profile Details<span className="text-red-500">*</span>
                      </p>
                      <div className="md:flex">
                        <div className="flex flex-col">
                          <label htmlFor="name" className="ml-3 text-gray-500">
                            Full Name
                          </label>
                          <CustomSignUpFormItem
                            name="name"
                            placeholder="Enter full name"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="organization_name"
                            className="ml-3 text-gray-500"
                          >
                            Organization Name
                          </label>
                          <CustomSignUpFormItem
                            name="organization_name"
                            placeholder="Enter organization name"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:flex">
                        <div className="relative">
                          <label
                            htmlFor="mobile"
                            className="ml-3 text-gray-500"
                          >
                            Mobile Number
                          </label>
                          <Input
                            name="mobile"
                            className="md:w-[250px] w-[200px] border-gray-500 md:mx-2"
                            placeholder="Enter mobile no"
                            type="number"
                            required
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            maxLength={10}
                            pattern="[0-9]*"
                          />
                          <p className="text-red-500">
                            {mobileError && mobileError}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="ml-3 mt-6 md:mt-0 text-gray-500"
                          >
                            Email (optional)
                          </label>
                          <CustomSignUpFormItem
                            name="email"
                            placeholder="Enter email"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:flex">
                        <div className="flex flex-col">
                          <label
                            htmlFor="password"
                            className="ml-3 text-gray-500"
                          >
                            Password
                          </label>
                          <CustomSignUpFormItem
                            name="password"
                            placeholder="Enter password"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="confirm_password"
                            className="ml-3 text-gray-500"
                          >
                            Confirm Password
                          </label>
                          <CustomSignUpFormItem
                            name="confirm_password"
                            placeholder="Enter confirm password"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:flex">
                        <div className="flex flex-col">
                          <label
                            htmlFor="idtype"
                            className="ml-3 text-gray-500"
                          >
                            Id Type
                          </label>
                          <Form.Item
                            name="idtype"
                            className="idtype-select md:ml-2"
                            rules={[
                              {
                                required: true,
                                message: "Please select idType",
                              },
                            ]}
                          >
                            <Select placeholder="Select Id Type">
                              <Select.Option value="Aadhaar Card">
                                Aadhaar Card
                              </Select.Option>
                              <Select.Option value="Pan Card">
                                Pan Card
                              </Select.Option>
                              <Select.Option value="License">
                                License
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="idnumber"
                            className="md:ml-5 ml-3 text-gray-500"
                          >
                            Id Proof Number
                          </label>
                          <div className="md:ml-2">
                            <CustomSignUpFormItem
                              name="idnumber"
                              placeholder="Enter Id Proof Number"
                              required
                              min={12}
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex flex-col">
              <label htmlFor="idfile" className="md:ml-5 ml-3  text-gray-500">
                Id File
              </label>
              <div>
                <Input
                  name="idfile"
                  type="file"
                  size="large"
                  className="md:w-[250px] w-[200px] md:ml-2 mb-5"
                  onChange={handleFileChange}
                />
              </div>
            </div> */}
                    </div>
                  )}

                  {showAddressDetails && !isFormSubmitted && (
                    <>
                      <p className="py-2 pl-3 text-lg">
                        Address Details<span className="text-red-500">*</span>
                      </p>
                      <div className="md:flex md:flex-wrap">
                        <div className="flex flex-col">
                          <label
                            htmlFor="door_no"
                            className="ml-3 text-gray-500"
                          >
                            Door Number
                          </label>
                          <CustomSignUpFormItem
                            name="door_no"
                            placeholder="Enter door_no"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="street_name"
                            className="ml-3 text-gray-500"
                          >
                            Street Name
                          </label>
                          <CustomSignUpFormItem
                            name="street_name"
                            placeholder="Enter streetName"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="landmark"
                            className="ml-3 text-gray-500"
                          >
                            Landmark
                          </label>
                          <CustomSignUpFormItem
                            name="landmark"
                            placeholder="Enter landmark"
                            required
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="country"
                            className="ml-5 text-gray-500"
                          >
                            Country
                          </label>
                          <Form.Item
                            name="country"
                            className="idtype-select md:ml-3"
                            rules={[
                              {
                                required: true,
                                message: "Please select country",
                              },
                            ]}
                          >
                            <Select showSearch placeholder="Select country">
                              {countriesResData?.map((item: CountryData) => (
                                <Select.Option
                                  key={item?.id}
                                  value={item?.name}
                                >
                                  {item?.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="state" className="ml-3 text-gray-500">
                            State
                          </label>
                          <Form.Item
                            name="state"
                            className="idtype-select md:ml-2"
                            rules={[
                              {
                                required: true,
                                message: "Please select state",
                              },
                            ]}
                          >
                            <Select showSearch placeholder="Select state">
                              {statesResData?.map((item: StateData) => (
                                <Select.Option
                                  key={item?.id}
                                  value={item?.name}
                                >
                                  {item?.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="city" className="ml-6 text-gray-500">
                            City
                          </label>

                          <Form.Item
                            name="city"
                            className="idtype-select md:ml-4"
                            rules={[
                              {
                                required: true,
                                message: "Please select city",
                              },
                            ]}
                          >
                            <Select showSearch placeholder="Select city">
                              {citiesResData?.map((item: CityData) => (
                                <Select.Option
                                  key={item?.id}
                                  value={item?.name}
                                >
                                  {item?.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="flex ml-4 flex-col space-y-3">
                        <Checkbox
                          checked={isTermsSelected}
                          onChange={handleTerms}
                        >
                          Accept the{" "}
                          <span className="text-cyan-600">terms </span>&{""}
                          <span className="text-cyan-600"> conditions</span>
                        </Checkbox>
                        <p className="text-red-500">
                          {termsError && termsError}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center md:justify-end space-x-2 ">
                    {!isFormSubmitted && (
                      <Button className="gray-btn w-24" onClick={handleBack}>
                        back
                      </Button>
                    )}
                    {!showAddressDetails && !isFormSubmitted && (
                      <Button className="color-btn w-24" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    {showAddressDetails && !isFormSubmitted && (
                      <Form.Item>
                        <Button htmlType="submit" className="color-btn w-24">
                          Submit
                        </Button>
                      </Form.Item>
                    )}
                    {isFormSubmitted && (
                      <div className="flex justify-end">
                        <div>
                          <Input
                            className="md:w-[250px] w-[120px] border-gray-500 md:mx-2 mr-2"
                            placeholder="Enter OTP"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                          />
                          <p className="text-red-500 ml-3">
                            {otpError && otpError}
                          </p>
                        </div>

                        <Button
                          className="color-btn w-24"
                          onClick={handleOtpSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                </Form>

                <div className="flex text-black justify-end mt-4">
                  <Typography>Already have an account?</Typography>
                  <Link to="/service-user-login">
                    <p className="pl-2 text-cyan-600">Login</p>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUpForm;
