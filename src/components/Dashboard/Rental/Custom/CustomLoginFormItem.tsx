import { Form, Input } from "antd";

type CustomLoginFormProps = {
  name: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const CustomLoginFormItem: React.FC<CustomLoginFormProps> = ({
  name,
  placeholder,
  required = false,
  onChange,
  value,
  type,
}) => {
  const rules = [
    { required, message: `Please enter your ${placeholder}` },
    { whitespace: true },
  ];
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
        className="w-full border-gray-400"
        onChange={onChange}
        value={value}
        type={type}
      />
    </Form.Item>
  );
};

export default CustomLoginFormItem;
