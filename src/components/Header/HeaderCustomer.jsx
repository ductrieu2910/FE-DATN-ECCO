import React, { useEffect, useState, useCallback } from "react";
import { HiSearch } from "react-icons/hi";
import { Badge, message, Popover } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { Navbar, Dropdown, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/category/category.thunk";
import { getProductSearch } from "../../redux/product/product.thunk";
import logo from "../../resources/logo-ecco1.png";
import { logoutCustomer } from "../../redux/auth/auth.slice";
import debounce from "lodash/debounce";
import { formatPrice } from "../../helpers/formatPrice";



const HeaderCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { isLoading, productSearchs } = useSelector((state) => state.product);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart.cart);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm) {
        dispatch(getProductSearch(searchTerm));
      } else {
        setSearchResults([]);
      }
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  useEffect(() => {
    if (productSearchs.length > 0) {
      setSearchResults(productSearchs);
    }
  }, [productSearchs]);

  const handleLogout = () => {
    dispatch(logoutCustomer());
    message.success("Đăng xuất thành công");
    navigate("/");
  };
  const selectedCategory1 = categories?.find(item => item.slug === "hang-moi-nam");
  const selectedCategory2 = categories?.find(item => item.slug === "hang-moi-nu");
  const selectedCategory3 = categories?.find(item => item.slug === "ecco-golf-lt1");
  const selectedCategory4 = categories?.find(item => item.slug === "mid-of-season-sale");

  const searchContent = (
    <div className="w-full max-h-[70vh] overflow-y-auto overflow-x-hidden">
      {isLoading ? (
        <div className="p-2">Đang tìm kiếm...</div>
      ) : searchResults.length > 0 ? (
        searchResults?.map((product) => (
          <div
            onClick={() => {
              navigate(`/detail/${product.slug}`);
              setSearch("");
            }}
            key={product._id}
            className="p-2 hover:bg-gray-100 cursor-pointer flex"
          >
            <img
              src={product.mainImage.url}
              alt={product.name}
              className="w-20 h-20 object-cover mr-2 rounded-md"
            />
            <div className="font-medium">
              <div className="text-sm line-clamp-2">{product.name}</div>
              <div className="text-[#820813]">
                {formatPrice(product.price)} đ
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-2">Không tìm thấy kết quả</div>
      )}
    </div>
  );

  return (
  <div>
    <div class="header-topbar ">
			<div class="container-header">
				<div  className="topbar-content topbar-content-popup">
					<a href="" style={{color: "#fff"}}><strong>MID OF SEASON SALE | Giảm 20% Cho Một Số Sản Phẩm. Tặng 1 Phụ Kiện Da Cho Hóa Đơn Trị Giá 12.000.000VNĐ  |Từ 09/09/2024 Đến 30/10/2024 | LH CSKH: 0919 390 371 </strong></a>
				</div>
			</div>
		</div>
    <Navbar className="py-5" fluid>
      <Navbar.Brand onClick={() => navigate("/")}>
        <img
          className="w-32 md:w-40 xl:w-40 2xl:w-44 cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </Navbar.Brand>
      <div className="flex items-center gap-4 md:order-2">
        <Popover
          content={searchContent}
          title="Kết quả tìm kiếm"
          trigger="click"
          visible={search.length > 0}
          overlayClassName="w-full md:w-[600px]"
        >
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            rightIcon={HiSearch}
            className="w-full md:w-auto"
            style={{backgroundColor:"#ffffff"}}
          />
        </Popover>
        <div onClick={() => navigate("/cart")} className="cursor-pointer">
          <Badge color="#b55947" count={products.length}>
            <ShoppingOutlined style={{ fontSize: "30px", color: "#b55947" }} />
          </Badge>
        </div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="cursor-pointer">
        <Navbar className="link-home" onClick={() => navigate("/")}>Trang Chủ</Navbar>
        <Navbar className="link-catagory">
  <div className="dropdown-ct">
    <button className="dropdown-toggle">DANH MỤC</button>
    <div className="dropdown-menu">
      <div style={{display:"flex",flexWrap:"wrap",width:"500px"}}>
        {categories?.map((item, index) => (
          <ul >
            <li
            className="dropdown-item"
            onClick={() => navigate(`/category/${item.slug}`)}
            key={index}
          >
            {item.name}
          </li>
          </ul>
        ))}
      </div>
      <div style={{display:"flex"}}>
      {selectedCategory1 && (
        <div>
          <div className="col-md-3" style={{ paddingRight: "7.5px" }}>
            <div className="mg-menu-banner-item">
              <a href={`/category/${selectedCategory1.slug}`}>
                <img
                  className="img-responsive"
                  src="..\src\resources\menu_img_1_1.webp"
                  alt={selectedCategory1.name}
                />
              </a>
            </div>
            <h6>
              <a href={`/category/${selectedCategory1.slug}`}>{selectedCategory1.name}</a>
            </h6>
          </div>
        </div>
      )}
      {selectedCategory2 && (
        <div>
          <div className="col-md-3" style={{ paddingRight: "7.5px" }}>
            <div className="mg-menu-banner-item">
              <a href={`/category/${selectedCategory2.slug}`}>
                <img
                  className="img-responsive"
                  src="..\src\resources\menu_img_1_2.webp"
                  alt={selectedCategory2.name}
                />
              </a>
            </div>
            <h6>
              <a href={`/category/${selectedCategory2.slug}`}>{selectedCategory2.name}</a>
            </h6>
          </div>
        </div>
      )}
      {selectedCategory3 && (
        <div>
          <div className="col-md-3" style={{ paddingRight: "7.5px" }}>
            <div className="mg-menu-banner-item">
              <a href={`/category/${selectedCategory3.slug}`}>
                <img
                  className="img-responsive"
                  src="..\src\resources\menu_img_1_3.webp"
                  alt={selectedCategory3.name}
                />
              </a>
            </div>
            <h6>
              <a href={`/category/${selectedCategory3.slug}`}>{selectedCategory3.name}</a>
            </h6>
          </div>
        </div>
      )}
      {selectedCategory4 && (
        <div>
          <div className="col-md-3" style={{ paddingRight: "7.5px" }}>
            <div className="mg-menu-banner-item">
              <a href={`/category/${selectedCategory4.slug}`}>
                <img
                  className="img-responsive"
                  src="..\src\resources\menu_img_7_1.webp"
                  alt={selectedCategory4.name}
                />
              </a>
            </div>
            <h6>
              <a href={`/category/${selectedCategory4.slug}`}>{selectedCategory4.name}</a>
            </h6>
          </div>
        </div>
      )}
    </div>
    </div>
       </div>
        </Navbar>
        <Navbar className="link-size" onClick={() => navigate("/size")}>Bảng Size</Navbar>
        <Navbar className="link-user">
          <Dropdown label="TÀI KHOẢN" inline>
            {!isAuthenticated ? (
              <>
                <Dropdown.Item onClick={() => (window.location.href = "/auth")}>
                  Đăng nhập
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => (window.location.href = "/auth?page=register")}
                >
                  Đăng ký
                </Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item onClick={() => navigate("/account")}>
                  Hồ sơ
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
              </>
            )}
          </Dropdown>
        </Navbar>
      </Navbar.Collapse>
    </Navbar>
  </div>         
  );
};

export default HeaderCustomer;
