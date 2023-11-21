import { Form, Input } from "antd";
import { ChangeEvent } from "react";

export interface SignUpInputData {
  name: string;
  organization_name: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  idtype:string;
  idnumber?: string;
  door_no: string;
  street_name: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
}

interface CustomSignUpFormDataProps {
  name: string;
  placeholder: string;
  required?: boolean;
  email?: string;
  maxLength?: number;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  min?: number;
}

const CustomSignUpFormItem: React.FC<CustomSignUpFormDataProps> = ({
  name,
  placeholder,
  required = false,
  maxLength,
  type,
  value,
  onChange,
  pattern,
  min,
}) => {
  const rules = [
    { required, message: `${placeholder} is required` },
    { min: min || 3 },
    { max: maxLength },
  ];

  return (
    <Form.Item name={name} rules={rules} hasFeedback>
      <Input
        placeholder={placeholder}
        size="large"
        className="md:w-[250px] w-[200px] border-gray-400 md:mx-2"
        maxLength={maxLength}
        type={type}
        value={value}
        onChange={onChange}
        pattern={pattern}
      />
    </Form.Item>
  );
};

export default CustomSignUpFormItem;
