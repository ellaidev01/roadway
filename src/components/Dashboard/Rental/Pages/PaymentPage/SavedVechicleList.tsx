import React, { useState } from "react";
import { Button, Checkbox, Input, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import {
  LeftCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  useGetAddedVehicleQuery,
  useGetVehicleBrandQuery,
} from "../../../../../services/configuration/serviceApi/serviceApi";
import { getUser } from "../../../../../constants/constants";

const { Search } = Input;

interface VehicleData {
  vid:number;
  vregno: string;
  vbrand: string;
  vgps: string;
  vfcdate: string;
  vinsdate: string;
  vuserid: string;
}

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

// interface ServiceDataObj {
//   id: number;
//   icon?: React.ReactNode;
//   serviceName: string;
// }

interface ServiceSelectionProps {
  handleAddService: () => void | undefined;
  handleBack: () => void | undefined;
  // serviceData?: ServiceDataItem[];
  // selectedService?: ServiceDataItem | null;
}

const handleUpdate = () => {};
const handleRemove = () => {};

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

const SavedVechicleList: React.FC<ServiceSelectionProps> = ({
  handleAddService,
  handleBack,
}) => {
  // const [pageData, setPageData] = useState<VehicleData[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });

  const { data: vehicleData } = useGetAddedVehicleQuery(undefined);
  const { data: vehiclebrand } = useGetVehicleBrandQuery(undefined);

  const getLoginUserVehicleData = () => {
    return vehicleData?.filter(
      (item: VehicleData) => item.vuserid === getUser()?.toLowerCase()
    );
  };

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
        const brandObj = vehiclebrand?.find(
          (item: vehicleBrand) => item?.brandid === parseInt(record?.vbrand)
        );

        return brandObj?.brandname || ""; // Display the brand name or an empty string
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
      render: () => (
        <span className="flex space-x-6">
          <button className="text-cyan-600" onClick={() => handleUpdate()}>
            <EditOutlined />
          </button>
          <button className="text-red-600" onClick={() => handleRemove()}>
            <DeleteOutlined />
          </button>
        </span>
      ),
    },
    {
      title: "Select_Service to List_in_Roadways",
      dataIndex: "checkbox",
      render: () => <Checkbox />,
    },
  ];

  return (
    <>
      <div className="md:flex space-y-2 md:space-y-0 justify-between ">
        <div>
          <LeftCircleOutlined
            onClick={handleBack}
            className="text-xl md:mx-4 mr-3 text-cyan-600"
          />
          <Button
            onClick={handleAddService}
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
          <Table
            columns={columns}
            rowKey="vid"
            dataSource={getLoginUserVehicleData()}
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
        </div>
      </div>
    </>
  );
};

export default SavedVechicleList;
