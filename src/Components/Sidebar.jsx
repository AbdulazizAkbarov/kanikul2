import { Menu } from "antd";
import React from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router";
function Sidebar({ collapsed }) {
  return (
    <Menu
      defaultOpenKeys={["sub1"]}
      inlineCollapsed={collapsed}
      mode="inline"
      className="bg-[]"
      style={{
        maxWidth: "200px",
        height: "full",
        background: "#324861",
      }}
      items={[
        {
          icon: <AppstoreOutlined />,
          key: 1,
          label: <Link to={"/"}>Home Page</Link>,
        },
        {
          icon: <AppstoreOutlined />,
          key: 2,
          label: <Link to={"mahsulotlar"}>Mahsulotlar</Link>,
        },
        {
          icon: <AppstoreOutlined />,
          key: 3,
          label: <Link to={"kategoria"}>Kategorialar</Link>,
        },
        {
          icon: <AppstoreOutlined />,
          key: 4,
          label: <Link to={"mijozlar"}>Mijozlar</Link>,
        },
        {
          icon: <AppstoreOutlined />,
          key: 5,
          label: <Link to={"bannerlar"}>Bannerlar</Link>,
        },
        {
          icon: <AppstoreOutlined />,
          key: 6,
          label: <Link to={"buyurtmalar"}>Buyurtmalar</Link>,
        },
      ]}
    />
  );
}

export default Sidebar;
