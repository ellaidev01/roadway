import { Button, Input, Select } from "antd";

const { TextArea } = Input;


const EnquiryPage = () => {
  return (
    <>
      <div>
        <div className="mb-2 ml-3">
          <Select placeholder="Select issue type" size="large">
            <Select.Option value="1">Payment related issues</Select.Option>
            <Select.Option value="2">Service related issues</Select.Option>
            <Select.Option value="3">Profile related issues</Select.Option>
            <Select.Option value="4">Other issues</Select.Option>
          </Select>
        </div>
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, marginBottom: 24 }}
          //   onChange={onChange}
          placeholder="Type here..."
          className="ml-2 "
        />
        <div className="flex justify-end mt-3">
          <Button className="color-btn">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default EnquiryPage;
