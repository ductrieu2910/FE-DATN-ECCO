import React, { useState, useEffect } from "react";
import { List, Pagination, DatePicker } from "antd";  // Import DatePicker
import { formatPrice } from "../helpers/formatPrice";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment.js để xử lý thời gian

const ProductListSale = ({
  products,
  title = "",
  setPagination,
  pagination = {
    page: 1,
    pageSize: 12,
    totalPage: 0,
    totalItems: 0,
  },
  isPagination = true,
}) => {
  const navigate = useNavigate();
  const [countdowns, setCountdowns] = useState([]);
  const [deadline, setDeadline] = useState(getOrCreateDeadline()); // Thêm trạng thái cho deadline

  const handleChangePage = (key, value) => {
    setPagination((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const displayProductsSale = products.slice(0, 4);
  const displayProductsSale1 = products.slice(4, 9);

  // Hàm tính thời gian còn lại
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // Hàm lấy hoặc tạo deadline
  function getOrCreateDeadline() {
    let storedDeadline = localStorage.getItem("deadline");

    if (!storedDeadline) {
      storedDeadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
      localStorage.setItem("deadline", storedDeadline.toISOString());
    } else {
      storedDeadline = new Date(storedDeadline);
    }

    return storedDeadline;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getTimeRemaining(deadline);
      setCountdowns(Array(displayProductsSale.length).fill(time));

      if (time.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [displayProductsSale.length, deadline]); // Chạy lại khi deadline thay đổi

  return (
    <div className="mx-auto px-4 py-8 md:px-8">
      {title && <h2 className="title-pro text-2xl font-bold uppercase mb-6">{title}</h2>}

      {/* List of products on sale */}
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 5,
        }}
        dataSource={displayProductsSale}
        renderItem={(item,index) => (
          <List.Item>
            <div
              className="Producthome cursor-pointer flex flex-col h-full"
              onClick={() => navigate(`/detail/${item.slug}`)}
            >
              <div className="relative pb-[100%] overflow-hidden rounded-lg">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item?.mainImage?.url}
                  alt={item.name}
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  20% OFF
                </span>
                <div
                  id={`clockdiv-${index}`}
                  className="clockdiv "
                >
                  <div className="px-1">
                    <span className="days">{countdowns[index]?.days || 0}</span>
                    <div className="text-xs">Days</div>
                  </div>
                  <div className="px-1">
                    <span className="hours">{countdowns[index]?.hours || 0}</span>
                    <div className="text-xs">Hours</div>
                  </div>
                  <div className="px-1">
                    <span className="minutes">{countdowns[index]?.minutes || 0}</span>
                    <div className="text-xs">Minutes</div>
                  </div>
                  <div className="px-1">
                    <span className="seconds">{countdowns[index]?.seconds || 0}</span>
                    <div className="text-xs">Seconds</div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex-grow">
                <h3 className="text-xs md:text-sm font-medium line-clamp-2">
                  {item.name}
                </h3>
                <div className="mt-6 flex items-center" style={{ flexDirection: "column" }}>
                  <span className="text-rose-800 font-bold text-sm">
                    {formatPrice(item.price - item.price * 0.2)}đ
                  </span>
                  <span className="text-slate-400 line-through text-sm">
                    {formatPrice(item.price)}đ
                  </span>
                </div>
                <div className="btn-hover">
                  <a href={`/detail/${item.slug}`}>Chi tiết sản phẩm</a>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* List of products with countdown */}
      <List
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 5,
        }}
        dataSource={displayProductsSale1}
        renderItem={(item, index) => (
          <List.Item>
            <div
              className="Producthome cursor-pointer flex flex-col h-full"
              onClick={() => navigate(`/detail/${item.slug}`)}
            >
              <div className="relative pb-[100%] overflow-hidden rounded-lg">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item?.mainImage?.url}
                  alt={item.name}
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  50% OFF
                </span>
                
              </div>
              <div className="mt-2 flex-grow">
                <h3 className="text-xs md:text-sm font-medium line-clamp-2">
                  {item.name}
                </h3>
                <div className="mt-6 flex items-center" style={{ flexDirection: "column" }}>
                  <span className="text-rose-800 font-bold text-sm">
                    {formatPrice(item.price - item.price * 0.5)}đ
                  </span>
                  <span className="text-slate-400 line-through text-sm">
                    {formatPrice(item.price)}đ
                  </span>
                </div>
                <div className="btn-hover">
                  <a href={`/detail/${item.slug}`}>Chi tiết sản phẩm</a>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />

      {/* Pagination */}
      {products?.length > 0 && pagination.totalPage > 1 && isPagination && (
        <div className="mt-8 flex justify-end">
          <Pagination
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.totalItems}
            onChange={(page) => handleChangePage("page", page)}
            onShowSizeChange={(_, size) => handleChangePage("pageSize", size)}
            defaultCurrent={1}
          />
        </div>
      )}
    </div>
  );
};

export default ProductListSale;
