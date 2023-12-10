import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker, notification } from "antd";
import CustomVehicleFormItem from "../../Custom/CustomVehicleFormItem";
import { SetStateAction, Dispatch } from "react";
import "../ServicePage/service.css";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  useAddVehicleMutation,
  useGetVehicleBrandQuery,
  useGetVehicleModelQuery,
  useGetVehicleTypeQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import {
  // useGetCitiesDataQuery,
  // useGetCountriesDataQuery,
  useGetStatesDataQuery,
} from "../../../../../services/configuration/signupApi/signUpApi";
import { StateData } from "../Login/SignUpForm";
import type { DatePickerProps } from "antd";
import { getUser } from "../../../../../constants/constants";

export type VehicleData = {
  vid:number,
  vtype: number;
  vmodel: number;
  vbrand: number;
  vusetype: string;
  vseats: number;
  vtons: number;
  vfuel: string;
  vtyres: number;
  vregno: string;
  vregstate: number;
  vgps: string;
  vinstype: string;
  vinsdate: string;
  vfcdate: string;
  vvalidity: string;
  vrcfile: null | string;
  vinsfile: null | string;
  votherfile: null | string;
  vmobile: number;
  visactive: number;
  vuserid: string;
  vsrvcid: number;
};

export type vehicleTypeData = {
  vtypeid: number;
  vtype: string;
};

export type vehicleBrandData = {
  brandid: number;
  brandname: string;
};

export type vehicleModelData = {
  vmid: number;
  vtypeid: number;
  vbrandid: number;
  vmname: string;
};

// export type VehicleLocationData = {
//   city: string;
//   state: string;
//   country: string;
// }

type FormProps = {
  isFormSubmitted: boolean;
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
  selectedServiceId: number | undefined;
  isAddVehicle: boolean;
  setIsAddVehicle: Dispatch<SetStateAction<boolean>>;
};

const ServiceForm: React.FC<FormProps> = ({
  selectedServiceId,
  isAddVehicle,
  setIsAddVehicle,
  setIsFormSubmitted,
}) => {
  const [form] = Form.useForm<VehicleData>();
  const [vehicleFormData, setVehicleFormData] = useState<VehicleData>();
  const [insDate, setInsState] = useState<string>("");
  const [fcDate, setFcState] = useState<string>("");
  const [vtypeId, setVtypeId] = useState<number | null>();
  const [vBrandId, setBrandId] = useState<number | null>();
  // const [selectedFile, setSelectedFile] = useState<string | null>(null);
  // const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
  //   null
  // );

  // const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
  //   null
  // );
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");

  const { data: vehicleTypeResData } = useGetVehicleTypeQuery(undefined);
  const { data: vehicleBrandResData } = useGetVehicleBrandQuery(undefined);
  const { data: vehicleModelResData } = useGetVehicleModelQuery({
    vtype: vtypeId || 1,
    vbrand: vBrandId || 1,
  });

  const [addVehicle] = useAddVehicleMutation();

  const {
    data: statesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetStatesDataQuery("IN");

  const handleChangeVehicleForm = (
    changedField: VehicleData,
    allValues: VehicleData
  ) => {
    setVtypeId(allValues?.vtype);
    setBrandId(allValues?.vbrand);

    setVehicleFormData((prevState) => ({
      ...prevState,
      ...changedField,
    }));
  };

  useEffect(() => {
    if (mobileNumber) {
      setMobileError("");
    }
  }, [mobileNumber]);

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
  const handleInsDatePickerChange: DatePickerProps["onChange"] = (
    _,
    dateString
  ) => {
    setInsState(dateString);
  };
  const handleFCDatePickerChange: DatePickerProps["onChange"] = (
    _,
    dateString
  ) => {
    setFcState(dateString);
  };

  const handleSubmit = async () => {
    try{
    const userId = getUser()?.toLowerCase();
    // const now = new Date();
    // const day = now.getDate().toString().padStart(2, "0"); // padStart is used to add 0 at starting of string when string contain single number.
    // const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, 0 - jan
    // const year = now.getFullYear() + 1;

    // const formattedDate = `${year}-${month}-${day}`;

    const payload = {
      ...vehicleFormData,
      vfcdate: fcDate,
      vinsdate: insDate,
      vuserid: userId,
      vsrvcid: selectedServiceId,
      vrcfile: null,
      vinsfile: null,
      votherfile: null,
      vimg1: "",
      vimg2: "",
      vimg3: "",
      vvalidity: null, // need to ask
      visactive: 0,
      vmobile: mobileNumber,
      vtons: Number(vehicleFormData?.vtons) || null,
    };
  
    if (selectedServiceId && userId && mobileNumber) {
      await addVehicle(payload);
      form.resetFields();
      setIsAddVehicle(!isAddVehicle);
      setIsFormSubmitted(true);
      notification.success({
        message: "Success",
        description: "Vehicle details submitted successfully!",
      });
    }
  }catch(err){
    if(err){
      notification.error({
        message: "Vehicle Registration Failed!",
        description: "There is an error while registering vehicle",
      });
    }
  }
  };

  const handleCancel = () => {
    setIsAddVehicle(!isAddVehicle);
  };

  return (
    <>
      <div className="overflow-hidden">
        <Form
          form={form}
          layout="horizontal"
          onFinish={handleSubmit}
          onValuesChange={handleChangeVehicleForm}
        >
          <div>
            <div>
              <LeftCircleOutlined
                onClick={handleCancel}
                className="text-xl ml-6 md:ml-6 mb-3 text-cyan-600"
              />
              <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5  md:m-0">
                Vehicle Details
              </p>
              <div className="flex w-full mx-2 flex-wrap">
                <div className="flex flex-col mb-3 ml-3 md:ml-0">
                  <label htmlFor="vmobile" className="ml-3 text-gray-500">
                    Vehicle Mobile No<span className="text-red-500">*</span>
                  </label>
                  <Input
                    size="large"
                    name="mobile"
                    className="md:w-[230px] w-[300px] border-gray-500 md:mx-2"
                    placeholder="Enter mobile no"
                    type="number"
                    required
                    value={mobileNumber}
                    onChange={handleMobileNumberChange}
                    maxLength={10}
                    pattern="[0-9]*"
                  />
                  <p className="text-red-500">{mobileError && mobileError}</p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vregno" className="ml-5 text-gray-500">
                    Vehicle Reg No<span className="text-red-500">*</span>
                  </label>
                  <CustomVehicleFormItem
                    placeholder="Enter Vehicle Reg No"
                    required
                    name="vregno"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="vtype" className="ml-5 text-gray-500">
                    Vehicle Type<span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vtype">
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select Vehicle Type"
                      className="custom-select"
                    >
                      {vehicleTypeResData?.map((item: vehicleTypeData) => (
                        <Select.Option key={item.vtypeid} value={item.vtypeid}>
                          {item.vtype}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vbrand" className="ml-5 text-gray-500">
                    Brand Name<span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vbrand">
                    <Select
                      size="large"
                      placeholder="Select Brand Name"
                      className="custom-select"
                      showSearch
                    >
                      {vehicleBrandResData?.map((item: vehicleBrandData) => (
                        <Select.Option key={item.brandid} value={item.brandid}>
                          {item.brandname}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="vmodel" className="ml-5 text-gray-500">
                    Vehicle Model<span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vmodel">
                    <Select
                      size="large"
                      placeholder="Select Vehicle Model"
                      className="custom-select"
                      showSearch
                    >
                      {vehicleModelResData?.map((item: vehicleModelData) => (
                        <Select.Option key={item.vmid} value={item.vmid}>
                          {item.vmname}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="vusetype" className="ml-5 text-gray-500">
                    Vehicle User Type<span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vusetype">
                    <Select
                      size="large"
                      placeholder="Select Vehicle_User_Type"
                      className="custom-select"
                      showSearch
                    >
                      <Select.Option value="Passenger">Passenger</Select.Option>
                      <Select.Option value="Commercial">
                        Commercial
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vregno" className="ml-5 text-gray-500">
                    Vehicle Seats Count<span className="text-red-500">*</span>
                  </label>
                  <CustomVehicleFormItem
                    placeholder="Enter Seats Count"
                    required
                    name="vseats"
                  />
                </div>
                {vehicleFormData?.vusetype === "Commercial" && (
                  <div className="flex flex-col">
                    <label htmlFor="vtons" className="ml-5 text-gray-500">
                      Vehicle Capacity {"(Tons)"}
                      <span className="text-red-500">*</span>
                    </label>
                    <CustomVehicleFormItem
                      name="vtons"
                      placeholder="Enter Vehicle_Capacity"
                      required
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <label htmlFor="vfuel" className="ml-5 text-gray-500">
                    Vehicle Fuel Type<span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vfuel">
                    <Select
                      size="large"
                      placeholder="Select Vehicle Fuel"
                      className="custom-select"
                      showSearch
                    >
                      <Select.Option value="Diesel">Diesel</Select.Option>
                      <Select.Option value="Petrol">Petrol</Select.Option>
                      <Select.Option value="Gas">Gas</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vtyres" className="ml-5 text-gray-500">
                    Vehicle Total Tyers<span className="text-red-500">*</span>
                  </label>
                  <CustomVehicleFormItem
                    name="vtyres"
                    placeholder="Enter Vehicle_Total_Tyres"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vregstate" className="ml-3 text-gray-500">
                    Vehicle Register State
                    <span className="text-red-500">*</span>
                  </label>
                  <Form.Item name="vregstate">
                    <Select
                      size="large"
                      placeholder="Select Vehicle Register State"
                      className="custom-select"
                      showSearch
                    >
                      {statesResData?.map((item: StateData) => (
                        <Select.Option key={item?.id} value={item?.id}>
                          {item?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex flex-col ml-2 md:ml-0">
                  <label htmlFor="votherfile" className="ml-5 text-gray-500">
                    Vehicle Image1<span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[300px] md:w-[250px] md:ml-2 mb-6"
                  />
                </div>
                <div className="flex flex-col ml-2 md:ml-0">
                  <label htmlFor="votherfile" className="ml-5 text-gray-500">
                    Vehicle Image2 (optional)
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[300px] md:w-[250px] md:ml-2 mb-6"
                  />
                </div>
                <div className="flex flex-col ml-2 md:ml-0">
                  <label htmlFor="votherfile" className="ml-5 text-gray-500">
                    Vehicle Image3 (optional)
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[300px] md:w-[250px] md:ml-4 mb-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5 md:m-0">
              Additional Details
            </p>

            <div className="flex mx-2 flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="vinstype" className="ml-5 text-gray-500">
                  Insurance Type<span className="text-red-500">*</span>
                </label>
                <Form.Item name="vinstype">
                  <Select
                    size="large"
                    placeholder="Select Insurance_Type"
                    className="custom-select"
                    showSearch
                  >
                    <Select.Option value="Passenger Vehicle Insurance">
                      Passenger Vehicle Insurance
                    </Select.Option>
                    <Select.Option value="Commercial Vehicle Insurance">
                      Commercial Vehicle Insurance
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label htmlFor="vinsdate" className="ml-5 text-gray-500">
                  Insurance Validity Till<span className="text-red-500">*</span>
                </label>
                <DatePicker
                  size="large"
                  onChange={handleInsDatePickerChange}
                  placeholder="Select Insurance Valid Till"
                />
              </div>
              <div className="flex flex-col my-3 md:my-0">
                <label htmlFor="vfcdate" className="ml-5 text-gray-500">
                  Next FC Date<span className="text-red-500">*</span>
                </label>
                <DatePicker
                  size="large"
                  onChange={handleFCDatePickerChange}
                  placeholder="Select Next FC Date"
                  className="mr-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vgps" className="ml-5 text-gray-500">
                  Is GPS Enabled (optional)
                </label>
                <Form.Item name="vgps">
                  <Select
                    size="large"
                    placeholder="Select Is GPS Enabled"
                    className="custom-select"
                  >
                    <Select.Option value="Yes">Yes</Select.Option>
                    <Select.Option value="No">No</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              {/* {vehicleFormData?.vgps === "Yes" && (
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    GPS_Next_Recharge_Date
                  </label>
                  <CustomDatePicker
                    placeholder="Select GPS_Next_Recharge_Date"
                    className="mr-2"
                  />
                </div>
              )} */}
            </div>
            <div className="md:flex md:ml-2">
              <div className="flex flex-col md:ml-0 ml-2">
                <label htmlFor="vrcfile" className="ml-5 text-gray-500">
                  RC File<span className="text-red-500">*</span>
                </label>
                <Input
                  name="vrcfile"
                  type="file"
                  size="large"
                  className="w-[300px] md:w-[250px] ml-2 mb-6"
                />
              </div>
              <div className="md:flex md:ml-0 ml-4">
                <div className="flex flex-col">
                  <label htmlFor="vinsfile" className="ml-5 text-gray-500">
                    Insurance File<span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="vinsfile"
                    type="file"
                    size="large"
                    className="w-[300px] md:w-[250px] md:ml-4 mb-6"
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5 md:m-0">
                Location Details<span className="text-red-500">*</span>
              </p>
              <div className="md:flex md:ml-2">
                <div className="flex flex-col">
                  <label htmlFor="country" className="ml-5 text-gray-400">
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

                <div className="flex flex-col">
                  <label htmlFor="state" className="ml-3 text-gray-400">
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
                    <Select size="large" showSearch placeholder="Select state">
                      {statesResData?.map((item: StateData) => (
                        <Select.Option key={item?.id} value={item?.name}>
                          {item?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="ml-6 text-gray-400">
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
                    <Select size="large" showSearch placeholder="Select city">
                      {citiesResData?.map((item: CityData) => (
                        <Select.Option key={item?.id} value={item?.name}>
                          {item?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex space-x-2 mb-3 justify-end mr-20">
            <Button onClick={handleCancel} className="gray-btn font-semibold">
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="color-btn text-white font-semibold"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ServiceForm;
