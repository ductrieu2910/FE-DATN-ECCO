import React, { useEffect } from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../../resources/logo-ecco2.png";
import HeaderCustomer from "../Header/HeaderCustomer";
import { useLocation } from "react-router-dom";

const LayoutUser = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-r ">
      <HeaderCustomer />
      <div className="flex-grow">{children}</div>
      <Footer container>
        <div className="w-full px-8">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="pb-4">
              <Footer.Brand
                className="h-full w-32 md:w-40 xl:w-40 2xl:w-44 rounded-xl"
                src={logo}
                alt="logo-ecco"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="about us" />
                <Footer.LinkGroup col>
                  <Footer.Link>Trang chủ</Footer.Link>
                  <Footer.Link>Tất cả sản phẩm</Footer.Link>
                  <Footer.Link>Kiểm tra đơn hàng</Footer.Link>
                  <Footer.Link>Hệ Thống Cửa Hàng</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow us" />
                <Footer.LinkGroup col>
                  <Footer.Link>Facebook</Footer.Link>
                  <Footer.Link>Instagram</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Chính sách cửa hàng" />
                <Footer.LinkGroup col>
                  <Footer.Link>Chính sách mua hàng</Footer.Link>
                  <Footer.Link>Chính sách bảo mật</Footer.Link>
                  <Footer.Link>Phương thức thanh toán</Footer.Link>
                  <Footer.Link>Chính sách giao nhận</Footer.Link>
                  <Footer.Link>Chính sách đổi trả</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by="Ecco" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon icon={BsFacebook} />
              <Footer.Icon icon={BsInstagram} />
              <Footer.Icon icon={BsTwitter} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default LayoutUser;
