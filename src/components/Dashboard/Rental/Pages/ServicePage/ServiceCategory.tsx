import { Input, Skeleton } from "antd";
import { getIcon } from "../../../../../helpers/utilities/icons";
import { Dispatch, SetStateAction } from "react";

const { Search } = Input;
// export interface ServiceDataItem {
//   id: number;
//   icon?: React.ReactNode;
//   serviceName: string;
// }

export interface ServiceDataItem {
  mid: number;
  type: string;
  value: string;
  status: number;
}

interface ServiceSelectionProps {
  handleServiceSelection?: (item: ServiceDataItem) => void | undefined;
  serviceData?: ServiceDataItem[];
  selectedService?: ServiceDataItem | null;
  isServiceTypeLoading:boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const ServiceCategory: React.FC<ServiceSelectionProps> = ({
  handleServiceSelection,
  serviceData,
  selectedService,
  isServiceTypeLoading,
  searchTerm,
  setSearchTerm
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
      {/* <h2 className="text-lg font-semibold text-center ">Service List</h2> */}

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
                  <img
                    src={getIcon(index)}
                    className="w-[40px]"
                    alt={`Vehicle ${index + 1}`}
                  />
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

export default ServiceCategory;
