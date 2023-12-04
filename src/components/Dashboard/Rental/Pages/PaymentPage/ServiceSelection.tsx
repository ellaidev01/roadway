import { Input, Skeleton } from "antd";
import { getIcon } from "../../../../../helpers/utilities/icons";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import LazyLoadImage from "../../Custom/LazyLoadImage.tsx"

const { Search } = Input;

export type ServiceDataItem = {
  mid: number;
  type: string;
  value: string;
  status: number;
}

type ServiceSelectionProps = {
  handleServiceSelection?: (item: ServiceDataItem) => void | undefined;
  serviceData?: ServiceDataItem[];
  selectedService?: ServiceDataItem | null;
  isServiceTypeLoading: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  handleServiceSelection,
  serviceData,
  selectedService,
  isServiceTypeLoading,
  searchTerm,
  setSearchTerm,
}) => {
  const onServiceItemClick = (item: ServiceDataItem) => {
    if (handleServiceSelection) {
      handleServiceSelection(item);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <Search
          placeholder="Search here..."
          className="md:w-[300px] w-[190px] mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2 className="text-lg font-semibold text-center ">
        Select Vehicle Type
      </h2>
      <div className="flex justify-center items-center flex-wrap">
        {serviceData?.map((item, index) => (
          <div
            key={index}
            className={`service-icon p-2 m-2 border shadow-md w-[200px] md:w-auto rounded-lg cursor-pointer  hover:bg-green-50
            ${
              selectedService && item?.mid === selectedService?.mid
                ? "bg-white-50"
                : ""
            }
            `}
            onClick={() => onServiceItemClick(item)}
          >
            {isServiceTypeLoading ? (
              <div className="w-[120px] h-[100px] flex flex-col justify-center items-center">
                <Skeleton paragraph={{ rows: 2 }} />
              </div>
            ) : (
              <>
                <div className="w-[120px] h-[50px] flex flex-col justify-center items-center">
                  <ErrorBoundary fallback={<div>Error loading component!</div>}>
                    <LazyLoadImage>
                      <img
                        src={getIcon(index)}
                        className="w-[40px]"
                        alt={`Vehicle ${index + 1}`}
                      />
                    </LazyLoadImage>
                  </ErrorBoundary>
                </div>
                <div className="w-[120px] h-[50px] flex flex-col justify-center items-center">
                  <p className="text-center text-gray-600">{item?.value}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceSelection;
