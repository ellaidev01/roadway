import { useEffect, useState } from "react";
import { Input, Skeleton, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import {
  LeftCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useGetAddedVehicleQuery,
  useGetServiceTypeQuery,
  useGetVehicleBrandQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import { getUser } from "../../../../../constants/constants";
import { VehicleData } from "../PaymentPage/AddVechicleForm";
import ServiceCategory, { ServiceDataItem } from "./ServiceCategory";
import { ServiceDataObj } from "../PaymentPage/PaymentPage";
import UpdateServiceVehicle from "./UpdateVehicleForm";

const { Search } = Input;

interface vehicleBrand {
  brandid: number;
  brandname: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null> | undefined; // Specify the type here
}

// const generateMockData = (count: number): VehicleData[] => {
//   const mockData: VehicleData[] = [];

//   for (let i = 1; i <= count; i++) {
//     mockData.push({
//       Vehicle_Number: `TN00${i}`,
//       Vehicle_Name: i % 2 === 0 ? `TATA ace` : "Mahindra",
//       Is_GPS_Enabled: i % 2 === 0 ? `Yes` : "No",
//       Next_FC_Date: i % 2 === 0 ? "11-02-2024" : "23-06-2024",
//     });
//   }

//   return mockData;
// };

// const mockData: VehicleData[] = generateMockData(20);

// const serviceData: ServiceDataObj[] = [
//   {
//     id: 1,
//     icon: <span>🚚</span>,
//     serviceName: "Goods & Services",
//   },
//   { id: 2, icon: <span>🚌</span>, serviceName: "Tours & Travels" },
//   { id: 3, icon: <span>🚕</span>, serviceName: "Car Service/ Water wash" },
// ];

const SavedVechicleList = () => {
  // const [pageData, setPageData] = useState<VehicleData[]>();
  const [isServiceSelected, setIsServiceSelected] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceDataObj | null>(
    null
  );
  const [selectedVehicleData, setSelectedVehicleData] = useState<object>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ServiceDataItem>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });

  const {
    data: vehicleResData,
    isLoading: isVehicleLoading,
    isError: isVehicleError,
  } = useGetAddedVehicleQuery(undefined);
  const {
    data: vehicleResBrand,
    isLoading: isVehicleBrandLoading,
    isError: isVehicleBrandError,
  } = useGetVehicleBrandQuery(undefined);
  const {
    data: serviceTypeResData,
    isLoading: isServiceTypeLoading,
    isError: isServiceTypeError,
  } = useGetServiceTypeQuery(undefined);

  const columns: ColumnsType<VehicleData> = [
    {
      title: "Vehicle Number",
      dataIndex: "vregno",
      sorter: true,
      width: "20%",
    },
    {
      title: "Vehicle Name",
      dataIndex: "vbrand",
      render: (_, record) => {
        const brandObj = vehicleResBrand?.find(
          (item: vehicleBrand) => item?.brandid === record?.vbrand
        );

        return brandObj?.brandname || "";
      },
      sorter: true,
      width: "20%",
    },

    {
      title: "Is GPS Enabled",
      dataIndex: "vgps",
      width: "20%",
    },
    // {
    //   title: "GPS_Next_Recharge Date",
    //   dataIndex: "GPS_Next_Recharge_Date",
    // },

    {
      title: "Next_FC_Date",
      dataIndex: "vfcdate",
    },
    {
      title: "Insurance_Date",
      dataIndex: "vinsdate",
    },

    {
      title: "Is_Active",
      dataIndex: "visactive",
      render: (_, record) => {
        return record.visactive === 1 ? (
          <p className="bg-cyan-50 border rounded-sm border-cyan-400 text-center text-cyan-600">
            YES
          </p>
        ) : (
          <a>No</a>
        );
      },
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <span className="flex space-x-6">
          <button
            className="text-cyan-600"
            onClick={() => handleUpdate(record)}
          >
            <EditOutlined />
          </button>
          <button className="text-red-600" onClick={() => handleRemove()}>
            <DeleteOutlined />
          </button>
        </span>
      ),
    },
  ];

  const handleClickService = (record: ServiceDataObj) => {
    setSelectedService(record);
    setIsServiceSelected(!isServiceSelected);
  };

  const getLoginUserVehicleData = () => {
    return vehicleResData?.filter(
      (item: VehicleData) => item?.vuserid === getUser()?.toLowerCase()
    );
  };

  const getSelectedServiceData = () => {
    return getLoginUserVehicleData()?.filter(
      (item: VehicleData) =>
        item?.vsrvcid === selectedService?.mid && item?.visactive === 1
    );
  };

  const handleBack = () => {
    setIsServiceSelected(!isServiceSelected);
  };

  const handleUpdate = (record: VehicleData) => {
    setSelectedVehicleData(record);
    setIsUpdate(!isUpdate);
  };

  const handleCancel = () => {
    setIsUpdate(!isUpdate);
  };

  const handleRemove = () => {};

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

  return (
    <>
      {isVehicleError && <div> Error Fetching Vehicle Data</div>}
      {isVehicleBrandError && <div> Error Fetching Vehicle Brand</div>}
      {isServiceTypeError && <div> Error Fetching ServiceType</div>}

      {!isServiceSelected && !isUpdate && (
        <div>
          <ServiceCategory
            serviceData={searchResult || serviceTypeResData}
            handleServiceSelection={handleClickService}
            isServiceTypeLoading={isServiceTypeLoading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      )}
      {isServiceSelected && !isUpdate && (
        <>
          <div className="md:flex space-y-2 md:space-y-0 justify-between ">
            <div>
              <LeftCircleOutlined
                onClick={handleBack}
                className="text-xl md:mx-4 mr-3 text-cyan-600"
              />
            </div>
            <Search
              placeholder="Search here..."
              className="md:w-[300px] w-full "
            />
          </div>
          <div className="rounded-md md:border mt-2">
            <div className="table-container overflow-x-auto">
              {isVehicleLoading ||
              isVehicleBrandLoading ||
              isServiceTypeLoading ? (
                // Show Skeleton when loading
                <Skeleton active />
              ) : (
                <Table
                  columns={columns}
                  rowKey="vid"
                  dataSource={getSelectedServiceData()}
                  pagination={tableParams.pagination}
                  scroll={{ x: true }} // Make the table scrollable in x-direction
                  onChange={(
                    pagination,
                    filters: Record<string, FilterValue | null>,
                    sorter
                  ) => {
                    setTableParams({
                      pagination,
                      filters,
                      ...sorter,
                    });

                    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
                    //   setPageData([]);
                    // }
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}

      {isServiceSelected && isUpdate && (
        <div>
          <UpdateServiceVehicle
            handleCancel={handleCancel}
            selectedServiceId={selectedService?.mid}
            selectedVehicleData={selectedVehicleData as VehicleData}
          />
        </div>
      )}
    </>
  );
};

export default SavedVechicleList;
