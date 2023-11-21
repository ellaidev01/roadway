import { Card } from "antd";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";

const PaymentSuccessMessage: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <div>
      <Card className="w-[250px] md:w-[500px] mt-10 rounded-lg border border-gray-300 shadow-lg">
        <div className="flex justify-center pb-2">
          <CheckCircleFilled className="text-green-600 text-xl" />
        </div>
        <div className="flex items-center">
          <p className="text-justify text-green-600">
            <span className="font-bold">Payment Success</span>. your service
            will be Activated within 24 hours. Activated service will be added
            to your <span className="font-bold">Service List Page</span>. You
            can view and manage your services in the Service List page. if any
            queries please post in Enquiry page.
          </p>
        </div>
      </Card>
      {/* <div className="flex justify-center">
        <Button
          onClick={() => navigate("/service-list")}
          className="mt-4 color-btn"
        >
          Go to Service List Page
        </Button>
      </div> */}
    </div>
  );
};

export default PaymentSuccessMessage;
