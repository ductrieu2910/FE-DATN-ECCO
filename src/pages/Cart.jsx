import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb, Table } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { formatPrice } from "../helpers/formatPrice";
import ModalCheckOut from "../components/Modal/ModalCheckOut";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cart/cart.slice";
import { CiSquareMinus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const breadcrumbItems = [
  {
    title: (
      <span className="text-slate-600 text-sm md:text-base cursor-pointer">
        <HomeOutlined /> Trang Chủ
      </span>
    ),
    key: "home",
  },
  {
    title: (
      <span className="text-slate-800 text-sm md:text-base cursor-pointer">
        Giỏ hàng
      </span>
    ),
    key: "cart",
  },
];

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalAmount } = useSelector((state) => state.cart.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleIncrement = (productId, size, color) => {
    dispatch(incrementQuantity({ productId, size, color }));
  };

  const handleDecrement = (productId, size, color) => {
    dispatch(decrementQuantity({ productId, size, color }));
  };

  const handleRemove = (productId, size, color) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <svg
          className="w-40 h-40 text-gray-400 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Hãy thêm một số sản phẩm vào giỏ hàng để bắt đầu mua sắm!
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ShoppingOutlined className="mr-2" />
          Bắt đầu mua sắm
        </button>
      </div>
    );
  }

  const columns = [
    {
      title: "Thông tin sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (_, item) => (
        <div className="flex items-center space-x-4">
          <img
            className="w-16 h-16 object-cover"
            src={item.image}
            alt={item.name}
          />
          <div>
            <div className="font-medium break-words">{item.name}</div>
            <div>
              Size/Màu: {item.size} / {item.color}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item) => (
        <div className="flex items-center space-x-2">
          <CiSquareMinus
            className="cursor-pointer text-[25px]"
            onClick={() =>
              handleDecrement(item.productId, item.size, item.color)
            }
          />
          <span>{item.quantity}</span>
          <CiSquarePlus
            className="cursor-pointer text-[25px]"
            onClick={() =>
              handleIncrement(item.productId, item.size, item.color)
            }
          />
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatPrice(price)}đ</span>,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, item) => (
        <span>{formatPrice(item.price * item.quantity)}đ</span>
      ),
    },
    {
      title: "Xóa",
      key: "remove",
      render: (_, item) => (
        <CiSquareRemove
          onClick={() => handleRemove(item.productId, item.size, item.color)}
          className="cursor-pointer text-[30px] text-[#cd3f34]"
        />
      ),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <ModalCheckOut
        open={open}
        setOpen={setOpen}
        products={products}
        totalAmount={totalAmount}
      />
      <div className="py-4 sm:py-6 lg:px-16">
        <Breadcrumb items={breadcrumbItems} />
        {/* Desktop view */}
        <div className="hidden md:block mt-6">
          <Table
            columns={columns}
            dataSource={products}
            rowKey={(record) =>
              `${record.productId}-${record.size}-${record.color}`
            }
            pagination={false}
          />
        </div>

        {/* Mobile view */}
        <div className="md:hidden mt-6 space-y-4">
          {products.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-24 h-24 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Size: <span className="font-medium">{item.size}</span> |
                    Màu: <span className="font-medium">{item.color}</span>
                  </p>
                  <p className="text-rose-800 font-bold text-lg mb-2">
                    {formatPrice(item.price)}đ
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow"
                        onClick={() =>
                          handleDecrement(item.productId, item.size, item.color)
                        }
                      >
                        <CiSquareMinus className="text-xl" />
                      </button>
                      <span className="text-lg font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow"
                        onClick={() =>
                          handleIncrement(item.productId, item.size, item.color)
                        }
                      >
                        <CiSquarePlus className="text-xl" />
                      </button>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() =>
                        handleRemove(item.productId, item.size, item.color)
                      }
                    >
                      <CiSquareRemove className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full md:w-80">
            <div className="flex justify-between items-center">
              <span>Tổng tiền:</span>
              <span className="text-rose-800 font-bold">
                {formatPrice(totalAmount)}đ
              </span>
            </div>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/auth");
                  return;
                }
                setOpen(true);
              }}
              className="w-full mt-4 py-3 px-2 bg-black text-white text-center rounded-md hover:bg-gray-800 transition-colors"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
