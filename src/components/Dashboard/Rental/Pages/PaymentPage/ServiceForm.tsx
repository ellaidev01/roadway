import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import CustomVehicleFormItem from "../../Custom/CustomVehicleFormItem";
import CustomDatePicker from "../../Custom/CustomVehicleDatePicker";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import "../ServicePage/service.css";
import { LeftCircleOutlined } from "@ant-design/icons";

export interface Vehicle_Data {
  vehicle_number: number;
  Vehicle_Type: string;
  Vehicle_Name: string;
  Vehicle_Capacity: string;
  Insurance_Type: string;
  Insurance_Valid_Till: string;
  GPS_Enabled: string;
  GPS_Next_Recharge_Date: string;
  Next_FC_Date: string;
  Vehicle_Added_Date: string;
}

interface MyComponentProps {
  handleSave: () => void;
  setIsServiceSelected: Dispatch<SetStateAction<boolean>>;
  isServiceSelected: boolean;
}

const ServiceForm: React.FC<MyComponentProps> = ({ handleSave }) => {
  const [form] = Form.useForm<Vehicle_Data>();
  const [value, setValue] = useState<string>("");

  const handleSubmit = (values: Vehicle_Data) => {
    console.log("Submitted data:", values);
  };

  const handleChange = (changedValue: string | undefined) => {
    if (changedValue !== undefined) {
      setValue(changedValue);
      console.log(changedValue);
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <Form form={form} layout="horizontal" onFinish={handleSubmit}>
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
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Vehicle No
                  </label>
                  <CustomVehicleFormItem
                    placeholder="Enter Enter Vehicle_No"
                    required
                    name="vehicle_number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Vehicle_Name" className="ml-5 text-gray-400">
                    Vehicle_Name
                  </label>
                  <CustomVehicleFormItem
                    name="Vehicle_Name"
                    placeholder="Enter Vehicle_Name"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="Vehicle_Capacity"
                    className="ml-5 text-gray-400"
                  >
                    Vehicle_Capacity
                  </label>
                  <CustomVehicleFormItem
                    name="Vehicle_Capacity"
                    placeholder="Enter Vehicle_Capacity"
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:ml-2">
                <div className="flex flex-col">
                  <label htmlFor="file" className="ml-5 text-gray-400">
                    Vehicle Image 1
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[250px] ml-2 mb-6"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                   Vehicle Image 2
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[250px] md:ml-4 mb-6"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Vehicle Image 3
                  </label>
                  <Input
                    type="file"
                    size="large"
                    className="w-[250px] md:ml-4 mb-6"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5 md:m-0">
                Additional Details<span className="text-red-500">*</span>
              </p>

              <div className="flex mx-2 flex-wrap">
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Insurance_Type
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select Insurance_Type"
                      className="custom-select"
                    >
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Insurance_Valid_Till
                  </label>
                  <CustomDatePicker placeholder="Select Insurance_Valid_Till" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Next_FC_Date
                  </label>
                  <CustomDatePicker
                    placeholder="Select Next_FC_Date"
                    className="mr-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    is_GPS_Enabled
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select is_GPS_Enabled"
                      className="custom-select"
                      onChange={handleChange}
                    >
                      <Select.Option value="Yes">Yes</Select.Option>
                      <Select.Option value="No">No</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                {value === "Yes" && (
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
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg  pb-3 ml-5 md:ml-5 md:m-0">
                Location Details<span className="text-red-500">*</span>
              </p>
              <div className="md:flex md:ml-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    Country
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select Country"
                      className="custom-select"
                    >
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    State
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select State"
                      className="custom-select"
                    >
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="vehicle_number"
                    className="ml-5 text-gray-400"
                  >
                    City
                  </label>
                  <Form.Item>
                    <Select
                      size="large"
                      placeholder="Select City"
                      className="custom-select"
                    >
                      <Select.Option value="demo">Demo</Select.Option>
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
