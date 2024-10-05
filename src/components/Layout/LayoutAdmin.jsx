import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  UsergroupAddOutlined,
  CarryOutOutlined,
  HeartOutlined,
  LogoutOutlined,
  SkinOutlined,
  DashboardOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import useScreen from "../../hook/useScreen";
import { logoutAdmin } from "../../redux/auth/auth.slice";
import { useDispatch } from "react-redux";


const { Content, Footer, Sider } = Layout;

function getItem(label, key, icon, path) {
  return {
    key,
    icon,
    label,
    path,
  };
}

const items = [
  getItem("Thống kê", "1", <BarChartOutlined />, "/admin/dashboard"),
  getItem("Người dùng", "2", <UsergroupAddOutlined />, "/admin/users"),
  getItem("Đơn hàng", "3", <CarryOutOutlined />, "/admin/orders"),
  getItem("Sản phẩm", "4", <SkinOutlined />, "/admin/products"),
  getItem("Danh mục", "5", <TagsOutlined />, "/admin/categories"),
  getItem("Đánh giá", "6", <HeartOutlined />, "/admin/reviews"),
  getItem("Đăng xuất", "7", <LogoutOutlined />, "/logout"),
];

const LayoutAdmin = ({ children, title = "" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const handleMenuClick = (item) => {
    const selectedItem = items.find((menuItem) => menuItem.key === item.key);
    if (selectedItem && selectedItem.path) {
      if (selectedItem.path === "/logout") {
        dispatch(logoutAdmin());
        navigate("/admin");
      } else {
        navigate(selectedItem.path);
      }
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {!isMobile && !collapsed && (
          <div className="text-slate-50 font-bold py-4 text-center text-xl"style={{backgroundColor:"Black"}}>
            <DashboardOutlined /> ECCO DASHBOARD
          </div>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          selectedKeys={[
            items.find((item) => item.path === location.pathname)?.key,
          ]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="bg-gradient-to-t from-slate-100" style={{backgroundColor:"#c75069"}}>
        <Content style={{ margin: "0 16px",}}>
          <div className="py-4 w-full">
            <div className="font-bold text-sm md:text-2xl">{title}</div>
            {children}
          </div>
        </Content>
        <Footer
          className="bg-gradient-to-t from-slate-100 to-slate-400"
          style={{ textAlign: "center", backgroundColor:"black" }}
        >
          <div className="font-medium">
            Admin ©{new Date().getFullYear()} Created by Ecco
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;