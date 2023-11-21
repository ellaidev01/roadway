import React from "react";
import { Form, DatePicker } from "antd";

type ComponentProps = {
  placeholder: string;
  fieldName?: string;
  className?: string;
};

const CustomDatePicker: React.FC<ComponentProps> = ({
  placeholder,
  fieldName,
}) => {
  return (
    <div className="md:ml-0">
      <Form.Item >
        <DatePicker placeholder={placeholder}  name={fieldName} size="large"  className="md:w-[230px] w-[300px] border-gray-400 mx-2"/>
      </Form.Item>
    </div>
  );
};

export default CustomDatePicker;
