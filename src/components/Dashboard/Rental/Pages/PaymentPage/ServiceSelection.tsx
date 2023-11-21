import { Input } from "antd";

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
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
  handleServiceSelection,
  serviceData,
  selectedService,
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
        />
      </div>
      <h2 className="text-lg font-semibold text-center ">
        Select Vehicle Category:
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
            {/* <i className="flex justify-center text-xl">{item.icon}</i> */}
            <p className="text-center text-gray-600">{item?.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceSelection;
