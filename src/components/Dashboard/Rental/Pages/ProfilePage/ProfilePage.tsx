/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import CustomFormItem from "../../Custom/CustomProfileFormItem";
import ProfileCard from "./ProfileCard";
import PopUp from "./PopUp";
import "./profile.css";
import { useGetUsersQuery } from "../../../../../services/configuration/loginApi/getUsersApi";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  useGetCitiesDataQuery,
  useGetCountriesDataQuery,
  useGetStatesDataQuery,
} from "../../../../../services/configuration/signupApi/signUpApi";
import { CityData, CountryData, StateData } from "../Login/SignUpForm";
import { getUser } from "../../../../../constants/constants";

export interface ProfileFormData {
  customer_Id: number;
  name: string;
  mobile: string;
  email: string;
  usertype: string;
  password: string;
  organization: string;
  door_No: string;
  streetName: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  idnumber: string;
  otp: string;
  website_or_URL?: URL[];
  social_media_URL?: URL[];
  addresse?: Address[];
}

export interface Address {
  door_No: string;
  streetName: string;
  landmark: string;
  district: string;
  state: string;
  pincode: number;
}

export interface URL {
  website_or_URL?: string;
  social_media_URL?: string;
}

export interface UserProfileObj {
  uid: number;
  name: string;
  uniqueid: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  email: string;
  pincode: string;
  idnumber: string;
}

const ProfilePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [form] = Form.useForm<ProfileFormData>();
  const [save, setSave] = useState(false);
  const [edit, setEdit] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [addresses, setAddresses] = useState<string[]>([]);
  const [urls, setURLs] = useState<string[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );

  const { data: users } = useGetUsersQuery(undefined);

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

  useEffect(() => {
    const profile = getLoginUserProfile();
    profile?.map((user: UserProfileObj) => {
      const address = user.address.split(",");

      form.setFieldsValue({
        name: user?.name,
        idnumber: user?.idnumber,
        country: user?.country,
        state: user?.state,
        city: user?.city,
        door_No: address[0],
        streetName: address[1],
        landmark: address[2],
      });
    });
  }, [edit]);

  const getLoginUserProfile = () => {
    return users?.filter(
      (user: UserProfileObj) => user?.uniqueid === getUser()
    );
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "cancel":
        // Handle cancel action
        break;
      case "back":
        setCurrentPage(currentPage - 1);
        break;
      case "next":
        setCurrentPage(currentPage + 1);
        break;
      case "save":
        // Handle save action with formData
        break;
      default:
        break;
    }
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const handleUrl = () => {
    setURLs([...urls, ""]);
  };

  const handleChangeProfileForm = (changedField: any) => {
    const countryCode = countriesResData?.find(
      (item: CountryData) => item?.name === changedField?.country
    );

    const stateCode = statesResData?.find(
      (item: StateData) => item?.name === changedField?.state
    );

    setSelectedCountryCode(countryCode?.iso2);
    setSelectedStateCode(stateCode?.state_code);

    // setSignUpFormData((prevState) => ({
    //   ...prevState,
    //   ...changedField,
    // }));
  };

  const handleSubmit = (values: ProfileFormData) => {
    console.log("Submitted data:", values);
    setInitialFormValues(values);
  };

  const handleSave = () => {
    setSave(!save);
    setEdit(!edit);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const handleRemoveURL = (index: number) => {
    const updatedURLs = [...urls];
    updatedURLs.splice(index, 1);
    setURLs(updatedURLs);
  };

  return (
    <>
      <div className="overflow-hidden">
        {save && <PopUp />}
        {!edit && (
          <div>
            <ProfileCard
              handleEdit={handleEdit}
              userProfile={getLoginUserProfile()}
            />
          </div>
        )}

        {edit && (
          <Form
            form={form}
            layout="horizontal"
            onValuesChange={handleChangeProfileForm}
            onFinish={handleSubmit}
            initialValues={initialFormValues}
          >
            {currentPage === 1 && (
              <div className="flex">
                <div>
                  <div>
                    <LeftCircleOutlined
                      onClick={handleSave}
                      className="text-xl ml-6 text-cyan-600 cursor-pointer pb-3"
                    />
                    <p className="font-semibold text-lg pb-6  md:ml-5  ml-5 md:m-0">
                      Profile Details
                    </p>
                    <div className="flex w-full mx-2 flex-wrap">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="ml-5 text-gray-400">
                          Name
                        </label>
                        <CustomFormItem
                          name="name"
                          placeholder="Enter Full Name"
                          required
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="idnumber"
                          className="ml-5 text-gray-400"
                        >
                          Aadhaar No
                        </label>
                        <div className="relative mb-2">
                          <CustomFormItem
                            name="idnumber"
                            placeholder="Enter Aadhaar No"
                            required
                          />
                          <a className="w-full absolute top-11 left-3 justify-end cursor-pointer">
                            Verify & Send OTP
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="otp" className="ml-5 text-gray-400">
                          OTP
                        </label>
                        <div className="relative mb-2">
                          <CustomFormItem
                            name="otp"
                            placeholder="Enter OTP"
                            required
                          />
                          <a className="absolute top-11 left-3  w-full cursor-pointer">
                            ReSend OTP
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:mt-5 ">
                    <p className="font-semibold text-lg  pb-6 ml-5 md:ml-5 mt-5 md:m-0">
                      Address Details
                    </p>

                    <div className="flex w-full mx-2 flex-wrap">
                      <div className="flex flex-col">
                        <label htmlFor="door_No" className="ml-5 text-gray-400">
                          Door No/Shop No
                        </label>
                        <CustomFormItem
                          name="door_No"
                          placeholder="Enter Door No/Shop No"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="streetName"
                          className="ml-5 text-gray-400"
                        >
                          StreetName
                        </label>
                        <CustomFormItem
                          name="streetName"
                          placeholder="Enter Street Name"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="landmark"
                          className="ml-5 text-gray-400"
                        >
                          Landmark
                        </label>
                        <CustomFormItem
                          name="landmark"
                          placeholder="Enter LandMark"
                          required
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="country" className="ml-5 text-gray-400">
                          Country
                        </label>
                        <Form.Item
                          name="country"
                          className="idtype-select md:ml-2"
                          rules={[
                            {
                              required: true,
                              message: "Please select country",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            showSearch
                            placeholder="Select country"
                          >
                            {countriesResData?.map((item: CountryData) => (
                              <Select.Option key={item?.id} value={item?.name}>
                                {item?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="ml-4 md:ml-1 md:flex">
                      <div className="flex flex-col">
                        <label htmlFor="state" className="ml-5 text-gray-400">
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
                          <Select
                            size="large"
                            showSearch
                            placeholder="Select state"
                          >
                            {statesResData?.map((item: StateData) => (
                              <Select.Option key={item?.id} value={item?.name}>
                                {item?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="city" className="ml-5 text-gray-400">
                          City
                        </label>
                        <Form.Item
                          name="city"
                          className="idtype-select md:ml-4 "
                          rules={[
                            {
                              required: true,
                              message: "Please select city",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            showSearch
                            placeholder="Select city"
                          >
                            {citiesResData?.map((item: CityData) => (
                              <Select.Option key={item?.id} value={item?.name}>
                                {item?.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    {/* <CustomFormItem
                        name="pincode"
                        placeholder="Pincode"
                        required
                      /> */}

                    <div>
                      {addresses.map((address, index) => (
                        <>
                          <p className="font-semibold text-lg  pb-6 ml-5 md:ml-5 mt-5 md:m-0">
                            New Address Details
                          </p>
                          <div key={index} className="flex flex-wrap">
                            <CustomFormItem
                              name="door_No"
                              placeholder="Enter Door No/Shop No"
                              required
                              value={address}
                            />
                            <CustomFormItem
                              name="streetName"
                              placeholder="Enter streetName"
                              required
                              value={address}
                            />
                            <CustomFormItem
                              name="landmark"
                              placeholder="Enter landmark"
                              required
                              value={address}
                            />
                            <CustomFormItem
                              name="city"
                              placeholder="district"
                              required
                              value={address}
                            />
                            <CustomFormItem
                              name="state"
                              placeholder="state"
                              required
                              value={address}
                            />
                            {/* <CustomFormItem
                              name="pincode"
                              placeholder="pincode"
                              required
                              value={address}
                            /> */}
                            <Button
                              className="gray-btn text-white ml-5 mb-3"
                              onClick={() => handleRemoveAddress(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </>
                      ))}
                    </div>
                    <div>
                      {urls.map((url, index) => (
                        <>
                          <p className="font-semibold text-lg  pb-6 ml-5 md:ml-5 mt-5 md:m-0">
                            Links
                          </p>
                          <div key={index} className="flex flex-wrap ml-2">
                            <CustomFormItem
                              name="social_media_URL"
                              placeholder="Social media URL"
                              required
                              value={url}
                            />
                            <CustomFormItem
                              name="website_or_URL"
                              placeholder="website_or_URL"
                              required
                              value={url}
                            />
                            <Button
                              className="gray-btn text-white ml-5 mb-3"
                              onClick={() => handleRemoveURL(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </>
                      ))}
                    </div>
                    <Button
                      className="color-btn ml-5"
                      onClick={handleAddAddress}
                    >
                      Add New Address
                    </Button>
                    <Button className="color-btn ml-2" onClick={handleUrl}>
                      Add URL
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mr-12 space-x-2 md:mr-20 mt-5">
              <Button
                onClick={() => handleAction("cancel")}
                className="gray-btn"
              >
                Cancel
              </Button>

              {currentPage < 2 && (
                <Button className="color-btn" onClick={handleSave}>
                  Save
                </Button>
              )}
              {/* {currentPage > 1 && (
                <Button
                  onClick={() => handleAction("back")}
                  className="gray-btn"
                >
                  Back
                </Button>
              )}
              {currentPage === 2 && (
                <Button
                  // htmlType="submit"
                  onClick={handleSave}
                  className="color-btn"
                  // onClick={() => handleAction("save")}
                >
                  Save
                </Button>
              )} */}
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
