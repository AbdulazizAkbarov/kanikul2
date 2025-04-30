import { Menu } from "antd";
import {

  HomeFilled,
  OrderedListOutlined,
  ProductFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";
import { ListOrdered,  } from "lucide-react";

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <div style={{ width: 200, height: "100vh", background: "#001529" }}>
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        defaultOpenKeys={["sub1"]}
        style={{ backgroundColor: "#001529", color: "white" }}
        items={[
          {
            key: "1",
            icon: <HomeFilled />,
            label: <Link to="/" style={{ color: "white" }}>Home Page</Link>,
          },
          {
            key: "2",
            icon: <ProductFilled />,
            label: <Link to="/mahsulotlar" style={{ color: "white" }}>Mahsulotlar</Link>,
          },
          {
            key: "3",
            icon: <ProductFilled />,
            label: <Link to="/kategoria" style={{ color: "white" }}>Kategorialar</Link>,
          },
          {
            key: "4",
            icon: <UserAddOutlined />,
            label: <Link to="/mijozlar" style={{ color: "white" }}>Mijozlar</Link>,
          },
          {
            key: "5",
            icon: <OrderedListOutlined />,
            label: <Link to="/bannerlar" style={{ color: "white" }}>Bannerlar</Link>,
          },
          {
            key: "6",
            icon: <ListOrdered />,
            label: <Link to="/buyurtmalar" style={{ color: "white" }}>Buyurtmalar</Link>,
          },
        ]}
      />
    </div>
  );
}

export default Sidebar;
