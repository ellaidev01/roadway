import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import CustomVehicleFormItem from "../../Custom/CustomVehicleFormItem";
import CustomDatePicker from "../../Custom/CustomVehicleDatePicker";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import "../ServicePage/service.css";
import { LeftCircleOutlined } from "@ant-design/icons";
import {
  useGetVehicleBrandQuery,
  useGetVehicleModelQuery,
  useGetVehicleTypeQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import {
  useGetCitiesDataQuery,
  useGetCountriesDataQuery,
  useGetStatesDataQuery,
} from "../../../../../services/configuration/signupApi/signUpApi";
import { CityData, CountryData, StateData } from "../Login/SignUpForm";

export interface Vehicle_Data {
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
}

interface MyComponentProps {
  handleSave: () => void;
  setIsServiceSelected: Dispatch<SetStateAction<boolean>>;
  isServiceSelected: boolean;
}

export interface vehicleTypeData {
  vtypeid: number;
  vtype: string;
}

export interface vehicleBrandData {
  brandid: number;
  brandname: string;
}

export interface vehicleModelData {
  vmid: number;
  vtypeid: number;
  vbrandid: number;
  vmname: string;
}

export interface VehicleLocationData {
  city: string;
  state: string;
  country: string;
}

const ServiceForm: React.FC<MyComponentProps> = ({ handleSave }) => {
  const [form] = Form.useForm<Vehicle_Data>();
  const [vehicleFormData, setVehicleFormData] = useState<VehicleLocationData>();
  // const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );

  const { data: vehicleBrandResData } = useGetVehicleBrandQuery(undefined);
  const { data: vehicleModelResData } = useGetVehicleModelQuery(undefined);
  const { data: vehicleTypeResData } = useGetVehicleTypeQuery(undefined);
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
  } = useGetStatesDataQuery(selectedCountryCode || "IN");

  const {
    data: citiesResData,
    // isLoading: isCitiesLoading,
    // isError: isCitiesError,
    // error: isCitiesError,
  } = useGetCitiesDataQuery(selectedStateCode || "TN");

  const handleChangeVehicleForm = (changedField: VehicleLocationData) => {
    const countryCode = countriesResData?.find(
      (item: CountryData) => item?.name === changedField?.country
    );

    const stateCode = statesResData?.find(
      (item: StateData) => item?.name === changedField?.state
    );

    setSelectedCountryCode(countryCode?.iso2);
    setSelectedStateCode(stateCode?.state_code);

    setVehicleFormData((prevState) => ({
      ...prevState,
      ...changedField,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted data:", vehicleFormData);
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
                onClick={handleSave}
                className="text-xl md:ml-6 mb-3 text-cyan-600"
              />{" "}
              <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5  md:m-0">
                Vehicle Details<span className="text-red-500">*</span>
              </p>
              <div className="flex w-full mx-2 flex-wrap">
                <div className="flex flex-col">
                  <label htmlFor="vregno" className="ml-5 text-gray-400">
                    Vehicle No
                  </label>
                  <CustomVehicleFormItem
                    placeholder="Enter Vehicle_No"
                    required
                    name="vregno"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="vtype" className="ml-5 text-gray-400">
                    Vehicle_Type
                  </label>
                  <Form.Item>
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select Vehicle_Type"
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
                  <label htmlFor="vbrand" className="ml-5 text-gray-400">
                    Brand Name
                  </label>
                  <Form.Item>
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
                  <label htmlFor="vmodel" className="ml-5 text-gray-400">
                    Vehicle Model
                  </label>
                  <Form.Item>
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
                  <label htmlFor="vtons" className="ml-5 text-gray-400">
                    Vehicle_Capacity {"(Tons)"}
                  </label>
                  <CustomVehicleFormItem
                    name="vtons"
                    placeholder="Enter Vehicle_Capacity"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vusetype" className="ml-5 text-gray-400">
                    Vehicle_User_Type
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select Vehicle_User_Type"
                      className="custom-select"
                      showSearch
                    >
                      <Select.Option value="Passenger">Passenger</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="vregno" className="ml-5 text-gray-400">
                    Vehicle Seats Count
                  </label>
                  <CustomVehicleFormItem
                    placeholder="Enter Vehicle_No"
                    required
                    name="vregno"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="votherfile" className="ml-5 text-gray-400">
                    Vehicle Image
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[250px] md:ml-4 mb-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5 md:m-0">
              Additional Details<span className="text-red-500">*</span>
            </p>

            <div className="flex mx-2 flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="vinstype" className="ml-5 text-gray-400">
                  Insurance_Type
                </label>
                <Form.Item>
                  <Select
                    size="large"
                    placeholder="Select Insurance_Type"
                    className="custom-select"
                    showSearch
                  >
                    <Select.Option value="demo">Car Insurance</Select.Option>
                    <Select.Option value="demo">Bike Insurance</Select.Option>
                    <Select.Option value="demo">
                      Commercial Vehicle Insurance
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label htmlFor="vinsdate" className="ml-5 text-gray-400">
                  Insurance_Validity_Till
                </label>
                <CustomDatePicker placeholder="Select Insurance_Valid_Till" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vfcdate" className="ml-5 text-gray-400">
                  Next_FC_Date
                </label>
                <CustomDatePicker
                  placeholder="Select Next_FC_Date"
                  className="mr-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vgps" className="ml-5 text-gray-400">
                  Is_GPS_Enabled
                </label>
                <Form.Item>
                  <Select
                    size="large"
                    placeholder="Select is_GPS_Enabled"
                    className="custom-select"
                  >
                    <Select.Option value="Yes">Yes</Select.Option>
                    <Select.Option value="No">No</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              {/* {vehicleFormData.vgps === "Yes" && (
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
              <div className="flex flex-col">
                <label htmlFor="vrcfile" className="ml-5 text-gray-400">
                  RC File
                </label>
                <Input
                  name="vrcfile"
                  type="file"
                  size="large"
                  className="w-[250px] ml-2 mb-6"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vinsfile" className="ml-5 text-gray-400">
                  Insurance File
                </label>
                <Input
                  name="vinsfile"
                  type="file"
                  size="large"
                  className="w-[250px] md:ml-4 mb-6"
                />
              </div>
            </div>
            <div>
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
            </div>
          </div>
          <div className="flex space-x-2 mb-3 justify-end mr-20">
            <Button onClick={handleSave} className="gray-btn font-semibold">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
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
