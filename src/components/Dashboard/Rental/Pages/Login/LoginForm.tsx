import React from "react";
import { Col, Divider, Typography, Button, Form, Input } from "antd";
import { LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export type FormValues = {
  mobile: string;
  password: string;
};

export type LoginProps = {
  handleLoginBtn: () => void;
  handleLoginChange: (_: FormValues, allValues: FormValues) => void;
  onFinish: (values: FormValues) => void;
}

const LoginForm: React.FC<LoginProps> = ({
  handleLoginChange,
  onFinish,
}) => {
  return (
    <>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div className="logBox bg-white py-2 m-10 absolute  -top-[124px] rounded-md">
            <Typography
              style={{ fontFamily: "'Inter', sans-serif" }}
              className="text-center text-xl mt-6 mb-0 "
            >
              Login
            </Typography>
            <Divider />

            <div className="bg-white px-[40px] pb-6 rounded-md">
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                size="large"
                autoComplete="on"
                onValuesChange={handleLoginChange}
              >
                <Typography className="text-center my-2">
                  Welcome to Roadways Services
                </Typography>

                <div className="w-[230px] md:w-[300px] mt-4">
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Mobile!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Mobile No"
                      className="mb-2"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Enter Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit" className="mt-2 color-btn w-full">
                      Login
                    </Button>
                  </Form.Item>
                </div>
              </Form>
                <div className="flex justify-between mt-4">
                  <a className="text-cyan-600">Forgot password?</a>
                  <div className="flex">
                    <p className="text-black">New User?</p>
                    <Link to="/service-user-signup">
                      <p className="pl-2 text-cyan-600">SignUp</p>
                    </Link>
                  </div>
                </div>
            </div>
          </div>
        </Col>
    </>
  );
};

export default LoginForm;
