import { Form, Input } from "antd";
import { ProfileFormData } from "../Pages/ProfilePage/ProfilePage";

type CustomFormDataProps = {
  name: keyof ProfileFormData;
  placeholder: string;
  required?: boolean;
  email?: boolean;
  username?: string;
  password?: string;
  remember?: string;
  resendotp?: string;
  value?: string;
}

const CustomFormItem: React.FC<CustomFormDataProps> = ({
  name,
  placeholder,
  required = false,
  value
  //   email = false,
}) => {
  const rules = [{ required, message: `Please enter your ${placeholder}` }];
  //   if (email) {
  //     rules.push({
  //       pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  //       message: "Invalid email format",
  //     });
  //   }
  return (
    <Form.Item name={name} rules={rules}>
      <Input
        placeholder={placeholder}
        size="large"
        className="md:w-[230px] w-[300px] border-gray-400 mx-2"
        value={value}
      />
    </Form.Item>
  );
};

export default CustomFormItem;
