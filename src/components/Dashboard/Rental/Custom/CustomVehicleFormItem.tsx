import { Form, Input } from "antd";
import { VehicleData } from "../Pages/PaymentPage/AddVechicleForm";

type CustomFormItemProps = {
  name: keyof VehicleData;
  placeholder: string;
  required?: boolean;
  email?: boolean;
  
}

const CustomVehicleFormItem: React.FC<CustomFormItemProps> = ({
  name,
  placeholder,
  required = false,
  //   email = false,
}) => {
  const rules = [{ required, message: `Please ${placeholder}` }];
  //   if (email) {
  //     rules.push({
  //       pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //       message: "Invalid email format",
  //     });
  //   }
  return (
    <Form.Item name={name} rules={rules}>
      <Input placeholder={placeholder} size="large"  className="md:w-[230px] w-[300px] border-gray-400 mx-2" />
    </Form.Item>
  );
};

export default CustomVehicleFormItem;
