import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SisternodeOutlined,
  TableOutlined,
  PhoneOutlined,
  BellFilled,
  RightCircleFilled,
  LeftCircleFilled,
  TrademarkCircleFilled,
} from "@ant-design/icons";
import { Layout, Menu, Drawer } from "antd";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import EnquiryPage from "../Pages/EnquiryPage/EnquiryPage";
import ServiceList from "../Pages/ServicePage/ServiceList";
import {
  clearTokenCookie,
  cookieToken,
  objectToQueryString,
  tokenAuthenticated,
} from "../../../../constants/constants";
import { Dispatch, SetStateAction } from "react";
import { useLogoutMutation } from "../../../../services/configuration/loginApi/logoutApi";

interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label: string;
  children?: MenuItem[];
}

function getItem(
  label: string,
  key: string,
  icon?: JSX.Element,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items: MenuItem[] = [
  getItem("Service Vehicle List", "1", <TableOutlined />),
  getItem("Add Vehicle", "2", <SisternodeOutlined />),
  getItem("Profile", "3", <UserOutlined />),
  getItem("Enquiry", "4", <PhoneOutlined />),
];

const drawerMenuItem = [
  { id: 1, label: "Vehicle List", icon: <TableOutlined /> },
  { id: 2, label: "Add Vehicle", icon: <SisternodeOutlined /> },
  { id: 3, label: "Profile", icon: <UserOutlined /> },
  { id: 4, label: "Enquiry", icon: <PhoneOutlined /> },
];

// in interface we define the shape of the property we are going to use.
interface RouteType {
  id: number;
  path: string;
}

// in type we define the structure
type routeDataArray = RouteType[];

interface layoutProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export interface InputLogoutData {
  client_id: string;
  client_secret: string;
  refresh_token: string | null;
}

// when we give like this we are setting like only array of obj with RouteType interface is allowed
const routeData: routeDataArray = [
  { id: 1, path: "/service-list" },
  { id: 2, path: "/add-service" },
  { id: 3, path: "/profile-page" },
  { id: 4, path: "/enquiry-page" },
];

const LayoutComponent: React.FC<layoutProps> = ({ setIsLoggedIn }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedMenuId, setSelectedmenuId] = useState<number>();
  const [selectedMenu, setSelectedMenu] = useState<number>();

  const [logout] = useLogoutMutation();

  const isSmallScreen = window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state based on the window width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    if (isSmallScreen) {
      showDrawer();
    } else {
      setCollapsed(!collapsed);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { Header, Sider, Content } = Layout;

  const navigate = useNavigate();

  const handleLogout = async () => {
    const storedRefreshToken = cookieToken(1);

    const inputData: InputLogoutData = {
      client_id: import.meta.env.VITE_CLIENT_ID,
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      refresh_token: storedRefreshToken,
    };

    const formDataQueryString = objectToQueryString(inputData);

    await logout(formDataQueryString).then(() => {
      navigate("/service-user-login");
      clearTokenCookie();
      setIsLoggedIn(tokenAuthenticated(0));
      localStorage.removeItem("user");
      localStorage.removeItem("username");
    });
  };

  const handleNavigate = (id: number) => {
    const item = routeData?.find((item) => item.id === id);
    if (item) {
      navigate(item.path);
    }
    setOpen(false);
    setSelectedMenu(id);
    setSelectedmenuId(id);
  };

  const text = drawerMenuItem?.find((item) => item.id === selectedMenu);

  const user = localStorage.getItem("username");

  return (
    <Layout className="h-screen">
      <Header
        style={{
          background:
            "var(--1, linear-gradient(89deg, #1C8FD1 -28.34%, #1CD190 104.47%))",
        }}
        className=" p-0 top-0 w-full z-10 h-[58px] shadow-md text-white"
      >
        <div className=" items-center h-14 ml-4">
          <i
            onClick={toggleCollapsed}
            className=" cursor-pointer rounded-lg text-2xl w-8 h-8  text-white"
          >
            {isSmallScreen ? (
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            ) : (
              <TrademarkCircleFilled />
            )}
          </i>
          <p className="text-lg hidden md:block absolute top-4 md:top-3 ml-8  md:text-xl text-center font-semibold italic">
            RoadWays Info Services
          </p>

          <i className="text-xl flex absolute top-4 md:top-4 md:right-20 right-12  cursor-pointer">
            <small className="mr-4">Welcome {user}</small>
            <BellFilled />
          </i>
        </div>

        <div className="flex flex-col justify-end items-center space-x-4 cursor-pointer font-semibold">
          <i
            onClick={handleLogout}
            className="text-xl absolute top-4 md:top-4 right-5 md:right-10 cursor-pointer"
          >
            <LogoutOutlined />
          </i>
        </div>
      </Header>
      <Layout className="h-screen text-black">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed} // closed = true
          style={{ background: " #e6f7e9" }}
          className="relative"
        >
          <i
            onClick={toggleCollapsed}
            className="cursor-pointer rounded-lg text-2xl w-8 h-8 text-white absolute hover:transform hover:scale-125 transition-all duration-300 ease-in-out"
            style={{ left: collapsed ? "70px" : "190px", top: "35px" }}
          >
            {collapsed ? (
              <RightCircleFilled className="text-cyan-500" />
            ) : (
              <LeftCircleFilled className="text-cyan-500" />
            )}
          </i>
          <div className="demo-logo-vertical" />
          {isSmallScreen ? (
            <Drawer
              title="Close"
              placement="left"
              width={500}
              onClose={onClose}
              open={open}
            >
              {drawerMenuItem.map((item, index) => (
                <div
                  key={index}
                  className={`flex rounded-md space-x-2 my-3 p-2 ${
                    selectedMenuId === item.id ? "menu-bg-color" : ""
                  }`}
                  onClick={() => handleNavigate(item.id)}
                >
                  <i
                    className={`${
                      selectedMenuId === item.id ? "text-white" : "text-black"
                    } `}
                  >
                    {item.icon}
                  </i>
                  <p
                    className={`${
                      selectedMenuId === item.id ? "text-white" : "text-black"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </Drawer>
          ) : (
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              className="text-gray-700 mt-20 font-semibold "
              style={{ background: "transparent" }}
              items={items}
              onClick={(e) => {
                const key = e.key; // when we click on menu item we get key from MenuItem it will be like "1"
                const item = routeData?.find((item) => item.id === Number(key));
                // console.log(item);
                setSelectedMenu(item?.id);
                if (item) {
                  navigate(item.path);
                }
              }}
            />
          )}
        </Sider>

        <Layout style={{ background: "#ffffff" }}>
          <Content className="md:px-[40px] px-1  overflow-auto h-screen bg-white md:my-8 md:ml-2 md:mr-10 rounded-md">
            <div className="flex">
              <p className="ml-2 text-2xl relative">{text?.label}</p>
            </div>
            <div className="py-6 w-full md:border shadow-sm  md:my-10 p-3 rounded-md">
              <Routes>
                <Route path="/" element={<ServiceList />} />
                <Route path="/service-list" element={<ServiceList />} />
                <Route path="/add-service" element={<PaymentPage />} />
                <Route path="/profile-page" element={<ProfilePage />} />
                <Route path="/enquiry-page" element={<EnquiryPage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
