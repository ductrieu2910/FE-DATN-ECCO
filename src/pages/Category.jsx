import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, Card } from "antd";
import { HomeOutlined, SendOutlined } from "@ant-design/icons";
import { getProductByCategory } from "../redux/product/product.thunk";
import ProductList from "../components/ProductList";
import banner from "../resources/banner-ecco5.jpg";

const Category = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products, pagination: paginate } = useSelector((state) => state.product);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 0,
    totalItems: 0,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("(updated_at:product=desc)");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  useEffect(() => {
    if (slug) {
      dispatch(getProductByCategory({ 
        slug, 
        ...pagination, 
        sort: sortOption,
        priceMin: priceRange.min,
        priceMax: priceRange.max === Infinity ? undefined : priceRange.max
      }));
    }
  }, [slug, pagination.page, pagination.pageSize, sortOption, priceRange, dispatch]);

  useEffect(() => {
    if (paginate) {
      setPagination((prev) => ({ ...prev, ...paginate }));
    }
  }, [paginate]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    document.body.style.overflow = isFilterOpen ? 'auto' : 'hidden';
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when sorting changes
    toggleFilter(); // Tắt bộ lọc sau khi thay đổi sắp xếp
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when price range changes
  };

  const renderCategories = () => (
    categories.map((category) => (
      <div
        onClick={() => navigate(`/category/${category.slug}`)}
        key={category._id}
        className={`${
          category.slug === slug ? "bg-slate-100" : ""
        } py-2 sm:py-3 hover:bg-slate-100 px-2 rounded-md cursor-pointer text-sm sm:text-base`}
      >
        <SendOutlined className="pr-1" /> {category.name}
      </div>
    ))
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="py-4 sm:py-6 lg:px-16">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined /> Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item>Danh mục sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
        <div className="text-sm sm:text-base py-4 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4 flex-shrink-0">
            <Card title="Danh mục sản phẩm" bordered={false}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {renderCategories()}
              </div>
            </Card>
          </div>
          <div className="flex-grow lg:w-3/4 relative">
            <Card title="Danh sách sản phẩm" bordered={false}>
              <img className="w-full rounded-md" src={banner} alt="banner-image" />
              <div className="browse-count col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="inner-browse-count">
                  <a 
                    onClick={toggleFilter}
                    id="close-open" 
                    className="btn-filtermore hidden-xs transition-transform duration-300"
                  >
                    <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none">
                      <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
                      <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
                      <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
                      <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
                    </svg>
                    Hiển thị bộ lọc
                  </a>
                </div>
              </div>
              {products?.length > 0 ? (
                <ProductList
                  products={products}
                  setPagination={setPagination}
                  pagination={pagination}
                />
              ) : (
                <div className="text-base font-medium text-center py-8">
                  Danh mục không có sản phẩm
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      <div 
        id="mySidenav"
        className={`siderbar-filter-col fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="wrapper-filter p-4">
          <div className="sidebar-header flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Bộ lọc</h3>
            <button onClick={toggleFilter} className="btn-close-siderbar">
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="siderbar-filter">
            <h4>Sắp xếp:</h4>
            <ul className="list-filter sidebar-sort">
              <li 
                className={sortOption === "(updated_at:product=desc)" ? "active" : ""}
                onClick={() => handleSortChange("(updated_at:product=desc)")}
              >
                Mới nhất
              </li>
              <li 
                className={sortOption === "(sold_quantity:product=desc)" ? "active" : ""}
                onClick={() => handleSortChange("(sold_quantity:product=desc)")}
              >
                Mua nhiều nhất
              </li>
              <li 
                className={sortOption === "(price:product=asc)" ? "active" : ""}
                onClick={() => handleSortChange("(price:product=asc)")}
              >
                Giá giảm
              </li>
              <li 
                className={sortOption === "(price:product=desc)" ? "active" : ""}
                onClick={() => handleSortChange("(price:product=desc)")}
              >
                Giá tăng
              </li>
              <li 
                className={sortOption === "(title:product=asc)" ? "active" : ""}
                onClick={() => handleSortChange("(title:product=asc)")}
              >
                Tên: A-Z
              </li>
              <li 
                className={sortOption === "(title:product=desc)" ? "active" : ""}
                onClick={() => handleSortChange("(title:product=desc)")}
              >
                Tên: Z-A
              </li>
            </ul>
          </div>
          <div className="siderbar-filter">
            <h4>Giá:</h4>
            <ul className="list-filter sidebar-price list-checkbox">
              <li 
                className={priceRange.max === 1000000 ? "active" : ""}
                onClick={() => handlePriceRangeChange(0, 1000000)}
              >
                <label>0 VNĐ ~ 1.000.000 VNĐ</label>
              </li>
              <li 
                className={priceRange.min === 1000000 && priceRange.max === 3000000 ? "active" : ""}
                onClick={() => handlePriceRangeChange(1000000, 3000000)}
              >
                <label>1.000.000VNĐ ~ 3.000.000VNĐ</label>
              </li>
              <li 
                className={priceRange.min === 3000000 && priceRange.max === 5000000 ? "active" : ""}
                onClick={() => handlePriceRangeChange(3000000, 5000000)}
              >
                <label>3.000.000VNĐ ~ 5.000.000VNĐ</label>
              </li>
              <li 
                className={priceRange.min === 5000000 && priceRange.max === 7000000 ? "active" : ""}
                onClick={() => handlePriceRangeChange(5000000, 7000000)}
              >
                <label>5.000.000VNĐ ~ 7.000.000VNĐ</label>
              </li>
              <li 
                className={priceRange.min === 5000000 && priceRange.max === Infinity ? "active" : ""}
                onClick={() => handlePriceRangeChange(5000000, Infinity)}
              >
                <label>Trên 5.000.000VNĐ</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleFilter}
        ></div>
      )}
    </div>
  );
};

export default Category;