import React, { useState } from "react";
// import qs from 'qs';
import { Input, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";
import ServiceCategory from "./ServiceCategory";
import { LeftCircleOutlined,EditOutlined,DeleteOutlined } from "@ant-design/icons";
import { useGetServiceTypeQuery } from "../../../../../services/configuration/serviceApi/serviceApi";

const { Search } = Input;

interface VehicleData {
  Vehicle_Number: string;
  Vehicle_Name: string;
  Is_GPS_Enabled: string;
  GPS_Next_Recharge_Date: string;
  Next_FC_Date: string;
  Service_Status: string;
  Subscription_end_date: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null> | undefined; // Specify the type here
}

const handleUpdate = () => {};
const handleRemove = () => {};

const columns: ColumnsType<VehicleData> = [
  {
    title: "Vehicle Number",
    dataIndex: "Vehicle_Number",
    sorter: true,
    width: "20%",
  },
  {
    title: "Vehicle Name",
    dataIndex: "Vehicle_Name",
    sorter: true,
    width: "20%",
  },

  {
    title: "Is GPS Enabled",
    dataIndex: "Is_GPS_Enabled",
    width: "20%",
  },
  {
    title: "GPS_Next_Recharge Date",
    dataIndex: "GPS_Next_Recharge_Date",
  },

  {
    title: "Next_FC_Date",
    dataIndex: "Next_FC_Date",
  },

  {
    title: "Service Activation Status",
    dataIndex: "Service_Status",
  },
  {
    title: "Subscription end_date",
    dataIndex: "Subscription_end_date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: () => (
      <span className="flex space-x-2">
        <button className="text-cyan-600" onClick={() => handleUpdate()}>
        <EditOutlined />
        </button>
        <button className="text-red-600" onClick={() => handleRemove()}>
        <DeleteOutlined />
        </button>
      </span>
    ),
  },
];

const generateMockData = (count: number): VehicleData[] => {
  const mockData: VehicleData[] = [];

  for (let i = 1; i <= count; i++) {
    mockData.push({
      Vehicle_Number: `TN00${i}`,
      Vehicle_Name: i % 2 === 0 ? `TATA ace` : "Mahindra",
      Is_GPS_Enabled: i % 2 === 0 ? `Yes` : "No",
      GPS_Next_Recharge_Date: i % 2 === 0 ? "11-02-2024" : "23-06-2024",
      Next_FC_Date: i % 2 === 0 ? "11-02-2024" : "23-06-2024",
      Service_Status: (i % 2 === 0) ? "Active" : "On Hold",
      Subscription_end_date: i % 2 === 0 ? "18-09-2024" : "19-08-2024",
    });
  }

  return mockData;
};

const mockData: VehicleData[] = generateMockData(20);


// const serviceData: ServiceDataObj[] = [
//   {
//     id: 1,
//     icon: <span>🚚</span>,
//     serviceName: "Goods & Services",
//   },
//   { id: 2, icon: <span>🚌</span>, serviceName: "Tours & Travels" },
//   { id: 3, icon: <span>🚕</span>, serviceName: "Car Service/ Water wash" },
// ];
const ServiceList: React.FC = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [data, setData] = useState<VehicleData[]>(mockData);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });

  const { data:serviceTypeResData } = useGetServiceTypeQuery(undefined);

  const handleClickService = () => {
    setIsSelected(!isSelected);
  };

  return (
    <>
      {!isSelected && (
        <div>
          <ServiceCategory
            serviceData={serviceTypeResData}
            handleServiceSelection={handleClickService}
          />
        </div>
      )}
      {isSelected && (
        <>
          <div className="md:flex space-y-2 md:space-y-0 justify-between">
            <LeftCircleOutlined
              onClick={handleClickService}
              className="text-xl md:ml-4 text-cyan-600"
            />
            <h2 className="text-2xl pb-2">Roadways Info Service List</h2>
            <Search
              placeholder="Search here..."
              className="md:w-[300px] w-full "
            />
          </div>
          <div className="rounded-md md:border mt-2">
            <div className="table-container overflow-x-auto">
              <Table
                columns={columns}
                rowKey="Vehicle_Number"
                dataSource={data}
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

                  if (
                    pagination.pageSize !== tableParams.pagination?.pageSize
                  ) {
                    setData([]);
                  }
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceList;
