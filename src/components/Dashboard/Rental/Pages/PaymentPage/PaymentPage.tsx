import React, { useState } from "react";
import PackageCard from "./PackageCard";
import PaymentSuccessMessage from "./SuccessMessage";
import ServiceSelection from "./ServiceSelection";
import ServiceForm from "./ServiceForm";
import { Button, Divider, Steps } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import PopUp from "../ProfilePage/PopUp";
import SavedVechicleList from "./SavedVechicleList";
import { useGetServiceTypeQuery } from "../../../../../services/configuration/serviceApi/serviceApi";

// this is the structure of PackageContent obj
interface PackageContent {
  id: number;
  heading: string;
  content1: string;
  content2: string;
  content3?: string; // if we use ? (optional) means data is undefined initially for content3
  price: number;
  btnName: string;
}

// interface ServiceDataObj {
//   id: number;
//   icon?: React.ReactNode;
//   serviceName: string;
// }

export interface ServiceDataObj {
  mid: number;
  type: string;
  value: string;
  status: number;
}

interface ExtendedServiceDataObj extends ServiceDataObj {
  uniqueId: number;
}

const packageContent: PackageContent[] = [
  {
    id: 1,
    heading: "One month Subscription",
    content1: "Unlock Unlimited Services",
    content2: "Duration: 1 Month",
    price: 200,
    btnName: "Select",
  },
  {
    id: 2,
    heading: "One year Subscription",
    content1: "Unlock Unlimited Services",
    content2: "Duration: 1 year",
    content3: "(50% discount)",
    price: 1200,
    btnName: "Select",
  },
];

// const serviceData: ServiceDataObj[] = [
//   {
//     id: 1,
//     icon: <span>🚚</span>,
//     serviceName: "Goods & Services",
//   },
//   { id: 2, icon: <span>🚌</span>, serviceName: "Tours & Travels" },
//   { id: 3, icon: <span>🚕</span>, serviceName: "Car Service/ Water wash" },
//   // { id: 4, serviceName: "Automobile Spare Parts" },
//   // { id: 5, serviceName: "Bike Rental & Self Drive" },
//   // { id: 6, serviceName: "Booking office" },
//   // { id: 7, serviceName: "Car Accessories" },
//   // { id: 8, serviceName: "Car Mechanic" },
//   // { id: 9, serviceName: "Car Painting & Dent Removal" },
//   // { id: 10, serviceName: "Car Rental & Self Drive" },
//   // { id: 11, serviceName: "Car Services" },
//   // { id: 12, serviceName: "Car Water Wash" },
//   // { id: 13, serviceName: "Driving School" },
//   // { id: 14, serviceName: "EV Bike Dealer" },
//   // { id: 15, serviceName: "Ev Car Dealer" },
//   // { id: 16, serviceName: "GPS & Vehicle Sensor Solutions" },
//   // { id: 17, serviceName: "JCB Operator" },
//   // { id: 18, serviceName: "Mobile Car Wash" },
//   // { id: 19, serviceName: "Mobile Oil Change" },
//   // { id: 20, serviceName: "New Bike Dealer" },
//   // { id: 21, serviceName: "New Car Dealer" },
//   // { id: 22, serviceName: "New Goods Career Dealer" },
//   // { id: 23, serviceName: "Second Hand Bike Dealer" },
//   // { id: 24, serviceName: "Second Hand Car Dealer" },
//   // { id: 25, serviceName: "Second Hand Goods Career Dealer" },
//   // { id: 26, serviceName: "Second Hand EV Bike Dealer" },
//   // { id: 27, serviceName: "Second Hand EV Car Dealer" },
//   // { id: 28, serviceName: "Tours & Travels" },
//   // { id: 29, serviceName: "Towing Services" },
//   // { id: 30, serviceName: "Tire Store" },
//   // { id: 31, serviceName: "Vehicle Batteries & Reconditioning" },
//   // { id: 32, serviceName: "Vehicle Body Building" },
//   // { id: 33, serviceName: "Vehicle Insurance Provider" },
//   // { id: 34, serviceName: "Vehicle Loan Provider" },
//   // { id: 35, serviceName: "Acting Driver" },
//   // { id: 36, serviceName: "Others" },
// ];

const PaymentPage: React.FC = () => {
  const [isPackageSelected, setIsPackageSelected] = useState<boolean>(false);
  const [isServiceSelected, setIsServiceSelected] = useState<boolean>(false);
  const [isAddService, setIsAddService] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceDataObj | null>(
    null
  );
  const [isServiceItemSelected, setIsServiceItemSelected] =
    useState<boolean>(false);
  const [groupItems, setGroupItems] = useState<ExtendedServiceDataObj[]>([]);

  const { data:serviceTypeResData } = useGetServiceTypeQuery(undefined);


  const handleSelectPackage = () => {
    setIsPackageSelected(true);
  };

  const handleServiceSelection = (item: ServiceDataObj) => {
    setIsServiceSelected(true);
    setSelectedService(item);
    const uniqueId = Date.now();
    const itemWithUniqueId: ExtendedServiceDataObj = { ...item, uniqueId };
    setGroupItems([...groupItems, itemWithUniqueId]);
  };

  const handleAddService = () => {
    setIsAddService(!isAddService);
  };

  const handleBack = () => {
    setIsServiceSelected(false);
  };

  const handleSave = () => {
    setIsAddService(false);
    setIsFormSubmitted(true);
  };


  const handleItemSelected = () => {
    setIsServiceItemSelected(!isServiceItemSelected);
  };

  return (
    <>
      <div className="h-auto">
        {!isServiceSelected && (
          <div className=" rounded-md flex flex-col justify-center flex-wrap items-center ">
            <ServiceSelection
              serviceData={serviceTypeResData}
              handleServiceSelection={handleServiceSelection}
              selectedService={selectedService}
            />
          </div>
        )}

        {isServiceSelected && !isAddService && !isServiceItemSelected && (
          <>
            <SavedVechicleList
              handleAddService={handleAddService}
              handleBack={handleBack}
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleItemSelected} className="color-btn ">
                Next
              </Button>
            </div>
          </>
        )}

        {isServiceSelected && isAddService && (
          <ServiceForm
            handleSave={handleSave}
            isServiceSelected={isServiceSelected}
            setIsServiceSelected={setIsServiceSelected}
          />
        )}
        {isFormSubmitted && <PopUp />}
        {!isServiceSelected && false && isFormSubmitted && (
          <div>
            <Divider />
          </div>
        )}
        {isServiceItemSelected && !isPackageSelected && (
          <>
            <div className="flex flex-wrap">
              <LeftCircleOutlined
                onClick={() => setIsServiceItemSelected(false)}
                className="text-xl ml-4 text-cyan-600"
              />
              <p className="text-xl text-center ml-3 md:ml-[350px]">
                Select Subscription Package
              </p>
              <div className="hidden md:block">
                <Steps
                  className="w-[700px] ml-[180px] mt-10"
                  current={1}
                  items={[
                    {
                      title: "Finished",
                      description: "Service Selection",
                    },
                    {
                      title: "In Progress",
                      description: "Package Selection",
                      // subTitle: "Left 00:00:08",
                    },
                    {
                      title: "Waiting",
                      // description,
                    },
                  ]}
                />
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center flex-wrap items-center">
          {isServiceItemSelected &&
            !isPackageSelected &&
            packageContent.map((item) => (
              <PackageCard
                key={item?.id}
                item={item}
                handleSelectPackage={handleSelectPackage}
              />
            ))}
        </div>
        {isPackageSelected && (
          <div>
            <div className="hidden md:block">
            <Steps
              className=" md:w-[700px] md:ml-[180px] mt-10"
              current={2}
              items={[
                {
                  title: "Finished",
                  description: "Service Selection",
                },
                {
                  title: "In Progress",
                  description: "Package Selection",
                  // subTitle: "Left 00:00:08",
                },
                {
                  title: "Completed",
                  description:"Payment Success"
                },
              ]}
            />
            </div>
            <div className="flex justify-center items-center">
              <PaymentSuccessMessage />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
