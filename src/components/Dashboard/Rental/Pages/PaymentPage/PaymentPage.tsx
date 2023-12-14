import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
// import PaymentSuccessMessage from "./SuccessMessage";
import ServiceSelection, { ServiceDataItem } from "./ServiceSelection";
import ServiceForm, { VehicleData } from "./AddVechicleForm";
import { Button,Divider, Steps, notification, Alert } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import SavedVehicleList from "./SavedVehicleList";
import {
  useActivateSubscriptionMutation,
  useGetServiceTypeQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { getUser } from "../../../../../constants/constants";
import UpdateVehicleForm from "./UpdateVehicleForm";

// this is the structure of PackageContent obj
export type PackageContent = {
  id: number;
  heading: string;
  content1: string;
  content2: string;
  content3?: string; // if we use ? (optional) means data is undefined initially for content3
  price: number;
  btnName: string;
};

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
    heading: "Trail Package",
    content1: "Unlock Unlimited Services",
    content2: "One month Subscription",
    price: 0,
    btnName: "Select",
  },
  // {
  //   id: 2,
  //   heading: "One year Subscription",
  //   content1: "Unlock Unlimited Services",
  //   content2: "Duration: 1 year",
  //   content3: "(50% discount)",
  //   price: 1200,
  //   btnName: "Select",
  // },
];

const PaymentPage: React.FC = () => {
  const [isPackageSelected, setIsPackageSelected] = useState<boolean>(false);
  const [isServiceSelected, setIsServiceSelected] = useState<boolean>(false);
  const [isAddVehicle, setIsAddVehicle] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceDataObj | null>(
    null
  );
  const [isVehicleItemSelected, setIsVehicleItemSelected] =
    useState<boolean>(false);
  const [groupItems, setGroupItems] = useState<ExtendedServiceDataObj[]>([]);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<number[]>([]);
  const [selectedServiceId, setSelectedServiceIds] = useState<number | null>(
    null
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [selectedVehicleData, setSelectedVehicleData] = useState<object>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ServiceDataItem>();

  const { data: serviceTypeResData, isLoading: isServiceTypeLoading } =
    useGetServiceTypeQuery(undefined);
  const [activateSubscription] = useActivateSubscriptionMutation();

  const handleServiceSelection = (item: ServiceDataObj) => {
    setIsServiceSelected(true);
    setSelectedService(item);

    const uniqueId = Date.now();
    const itemWithUniqueId: ExtendedServiceDataObj = { ...item, uniqueId };
    setGroupItems([...groupItems, itemWithUniqueId]);
  };

  const handleItemSelected = () => {
    setIsVehicleItemSelected(!isVehicleItemSelected);
  };

  const handleSelectedVehicleIds = (
    e: CheckboxChangeEvent,
    selectedRecord: VehicleData
  ) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add the id to the selectedIds array
      setSelectedVehicleIds((prevSelectedIds) => [
        // Set is used to add unique values , it removes dublicate ids
        ...new Set([...prevSelectedIds, selectedRecord?.vid]),
      ]);
      setSelectedServiceIds(selectedRecord?.vsrvcid);
    } else {
      // Remove the id from the selectedIds array
      setSelectedVehicleIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== selectedRecord?.vid)
      );
    }
  };

  const handleActivateSubscription = async () => {
    try {
      const inputData = selectedVehicleIds.map((id) => ({
        p_custid: getUser()?.toLowerCase(),
        p_serid: selectedServiceId,
        p_vid: id,
        p_nextrcdate: "2024-10-20",
        p_paymentdate: "2023-10-19",
        p_amountpaid: 1000,
        p_gst: 180,
      }));

      // Using forEach to iterate through inputData array
      inputData.forEach(async (data) => {
        try {
          if (data !== null) {
            const res = await activateSubscription(data);
            if ("data" in res) {
              notification.success({
                message: "Success",
                description: "Service Activated Successfully",
              });
            }
          }
        } catch (apiError) {
          console.error("Error activating subscription:", apiError);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (record: VehicleData) => {
    setSelectedVehicleData(record);
    setIsUpdate(!isUpdate);
  };

  const handleCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const handleSelectPackage = () => {
    setIsPackageSelected(true);
  };

  useEffect(() => {
    if (searchTerm) {
      const searchResult = serviceTypeResData?.filter((item: ServiceDataItem) =>
        item?.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResult(searchResult);
    } else {
      setSearchResult(serviceTypeResData);
    }
  }, [searchTerm]);

  // console.log(selectedService?.mid);
  console.log(isServiceSelected, isVehicleItemSelected, isPackageSelected);

  return (
    <>
      <div className="h-auto">
        {!isServiceSelected && (
          <div className=" rounded-md flex flex-col justify-center flex-wrap items-center ">
            <ServiceSelection
              serviceData={searchResult || serviceTypeResData}
              handleServiceSelection={handleServiceSelection}
              selectedService={selectedService}
              isServiceTypeLoading={isServiceTypeLoading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        )}

        {isServiceSelected &&
          !isAddVehicle &&
          !isVehicleItemSelected &&
          !isUpdate && (
            <>
              <SavedVehicleList
                isAddVehicle={isAddVehicle}
                setIsAddVehicle={setIsAddVehicle}
                isServiceSelected={isServiceSelected}
                setIsServiceSelected={setIsServiceSelected}
                selectedServiceId={selectedService?.mid}
                handleSelectedVehicleIds={handleSelectedVehicleIds}
                handleUpdate={handleUpdate}
                isFormSubmitted={isFormSubmitted}
                selectedVehicleIds={selectedVehicleIds}
              />
              <div className="flex justify-end mt-2">
                <Button
                  disabled={selectedVehicleIds?.length ? false : true}
                  onClick={handleItemSelected}
                  className="color-btn "
                >
                  Next
                </Button>
              </div>
            </>
          )}

        {isServiceSelected && isAddVehicle && (
          <ServiceForm
            isAddVehicle={isAddVehicle}
            setIsAddVehicle={setIsAddVehicle}
            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
            selectedServiceId={selectedService?.mid}
          />
        )}
        {isServiceSelected && isUpdate && (
          <UpdateVehicleForm
            handleCancel={handleCancel}
            selectedServiceId={selectedService?.mid}
            selectedVehicleData={selectedVehicleData as VehicleData}
          />
        )}
        {!isServiceSelected && false && isFormSubmitted && (
          <div>
            <Divider />
          </div>
        )}
        {isVehicleItemSelected && !isPackageSelected && (
          <>
            <div className="flex flex-wrap">
              <LeftCircleOutlined
                onClick={() => {
                  setIsVehicleItemSelected(false);
                }}
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
          {isVehicleItemSelected &&
            !isPackageSelected &&
            packageContent.map((item) => (
              <PackageCard
                key={item?.id}
                item={item}
                handleSelectPackage={handleSelectPackage}
                selectedVechicleIds={selectedVehicleIds}
                handleSubscription={handleActivateSubscription}
              />
            ))}
        </div>
        {isServiceSelected && isVehicleItemSelected && isPackageSelected && (
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
                  },
                  {
                    title: "Completed",
                    description: "Payment Success",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col md:flex justify-center items-center">
              <Alert
                className="w-[300px] mt-4"
                message="Payment Success"
                description="Vehicle Subscription is activated"
                type="success"
                showIcon
              />
              <Button
                onClick={() => {
                  setIsServiceSelected(false);
                  setIsPackageSelected(false);
                  setIsVehicleItemSelected(false);
                  setSelectedVehicleIds([]);
                  setSelectedServiceIds(null);
                }}
                className="mt-4 color-btn"
              >
                back to list
              </Button>
            </div>
            {/* <div className="flex justify-center items-center">
              <PaymentSuccessMessage
                setIsServiceSelected={setIsServiceSelected}
              />
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentPage;
