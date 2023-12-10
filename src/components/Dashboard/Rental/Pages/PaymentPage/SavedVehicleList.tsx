import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Skeleton, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import {
  LeftCircleOutlined,
  EditOutlined,
  // DeleteOutlined,
} from "@ant-design/icons";
import {
  useGetAddedVehicleQuery,
  useGetVehicleBrandQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import { getUser } from "../../../../../constants/constants";
import { SetStateAction, Dispatch } from "react";
import { VehicleData } from "./AddVechicleForm";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const { Search } = Input;

export type vehicleBrand = {
  brandid: number;
  brandname: string;
};

export type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null> | undefined; // Specify the type here
};

type ServiceSelectionProps = {
  isFormSubmitted: boolean;
  isAddVehicle: boolean;
  setIsAddVehicle: Dispatch<SetStateAction<boolean>>;
  isServiceSelected: boolean;
  setIsServiceSelected: Dispatch<SetStateAction<boolean>>;
  selectedServiceId: number | undefined;
  handleUpdate: (record: VehicleData) => void;
  handleSelectedVehicleIds: (e: CheckboxChangeEvent, data: VehicleData) => void;
};

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

const SavedVehicleList: React.FC<ServiceSelectionProps> = ({
  isAddVehicle,
  setIsAddVehicle,
  isServiceSelected,
  setIsServiceSelected,
  selectedServiceId,
  handleUpdate,
  handleSelectedVehicleIds,
  isFormSubmitted,
}) => {
  // const [pageData, setPageData] = useState<VehicleData[]>();
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
        const brandObj = vehicleBrand?.find(
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
          {/* <button className="text-red-600" onClick={() => handleRemove()}>
            <DeleteOutlined />
          </button> */}
        </span>
      ),
    },
    {
      title: "Select_Service to List_in_Roadways",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => {
            handleSelectedVehicleIds(e, record);
          }}
        />
      ),
    },
  ];
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });

  const {
    data: vehicleData,
    isLoading: isVehicleLoading,
    refetch,
  } = useGetAddedVehicleQuery(undefined);
  const { data: vehicleBrand } = useGetVehicleBrandQuery(undefined);

  const getLoginUserVehicleData = () => {
    return vehicleData?.filter(
      (item: VehicleData) => item?.vuserid === getUser()?.toLowerCase()
    );
  };

  const getSelectedServiceData = () => {
    return getLoginUserVehicleData()?.filter(
      (item: VehicleData) =>
        item?.vsrvcid === selectedServiceId && item?.visactive === 0
    );
  };

  const handleAddVehicle = () => {
    setIsAddVehicle(!isAddVehicle);
  };

  const handleBack = () => {
    setIsServiceSelected(!isServiceSelected);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      refetch();
    }
  }, [isFormSubmitted]);

  return (
    <>
      <div className="md:flex space-y-2 md:space-y-0 justify-between ">
        <div>
          <LeftCircleOutlined
            onClick={handleBack}
            className="text-xl md:mx-4 mr-3 text-cyan-600"
          />
          <Button
            onClick={handleAddVehicle}
            className="color-btn mt-2 mr-2 md:mr-0 md:mt-0"
          >
            Add Vehicle
          </Button>
        </div>
        <h2 className="text-2xl  pb-2">Vehicle List</h2>
        <Search placeholder="Search here..." className="md:w-[300px] w-full " />
      </div>
      <div className="rounded-md md:border mt-2">
        <div className="table-container overflow-x-auto">
          {isVehicleLoading ? (
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
  );
};

export default SavedVehicleList;
