import { Carousel, Image, message, notification, Rate, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Breadcrumb, TextInput } from "flowbite-react";
import useScreen from "../hook/useScreen";
import DescriptionDetail from "../components/DescriptionDetail";
import RateList from "../components/RateList";
import ProductList from "../components/ProductList";
import ModalRate from "../components/Modal/ModalRate";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailProduct,
  getProductHome,
} from "../redux/product/product.thunk";
import empty from "../resources/empty-order.png";
import { formatPrice } from "../helpers/formatPrice";
import { size } from "../const/size";
import { addToCart } from "../redux/cart/cart.slice";
import { FaShoppingCart } from "react-icons/fa";
import confetti from "canvas-confetti";

const Detail = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { isMobile } = useScreen();
  const dispatch = useDispatch();
  const { productDetail, isLoading, productHome } = useSelector(
    (state) => state.product
  );
  const [rate, setRate] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    image: "",
    size: "36",
    color: "",
    price: "",
    quantity: 1,
  });

  useEffect(() => {
    if (slug) {
      dispatch(getDetailProduct(slug));
    }
  }, [slug]);

  useEffect(() => {
    if (productDetail && !isLoading) {
      setProduct((prev) => ({
        ...prev,
        productId: productDetail._id,
        name: productDetail.name,
        image: productDetail.variants?.[0]?.image?.url || "",
        color: productDetail.variants?.[0]?.color || "",
        price: productDetail.price,
      }));
    }
  }, [productDetail, isLoading]);

  useEffect(() => {
    if (productDetail?.category?.slug) {
      dispatch(getProductHome(productDetail?.category?.slug));
    }
  }, [productDetail]);

  const createIcon = (index) => {
    const isActive =
      (rate && rate >= index) || (hoverValue && hoverValue >= index);
    const gradientId = `gradient-${index}`;

    return (
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={index}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isActive ? "#ff9a9e" : "#a8edea"} />
            <stop offset="100%" stopColor={isActive ? "#fad0c4" : "#fed6e3"} />
          </linearGradient>
        </defs>
        <path
          d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
          fill={`url(#${gradientId})`}
        />
      </svg>
    );
  };

  const customIcons = () => {
    return {
      1: createIcon(1),
      2: createIcon(2),
      3: createIcon(3),
      4: createIcon(4),
      5: createIcon(5),
    };
  };

  const handleChangeProduct = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const openNotification = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    notification.success({
      message: (
        <div className="font-bold text-base sm:text-xl animate-pulse">
          Thêm vào giỏ hàng thành công!
        </div>
      ),
      description: (
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
          <div className="relative mb-4 sm:mb-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full sm:w-24 h-24 object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
              Mới
            </div>
          </div>
          <div className="flex-1 w-full">
            <h4 className="text-sm font-semibold mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
              {product.name}
            </h4>
            <div className="flex gap-2 items-center mb-2">
              <p className="text-sm text-gray-600">
                Size:{" "}
                <span className="font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {product.size}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Màu:{" "}
                <span className="font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {product.color}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-red-600">
                {formatPrice(product.price)}đ
              </span>
            </div>
            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaShoppingCart className="mr-2" /> Xem giỏ hàng
            </button>
          </div>
        </div>
      ),
      placement: "topRight",
      duration: 5,
      className: "custom-notification",
      style: {
        width: "600px",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
    });
  };

  const handleAddToCart = () => {
    if (!product.quantity || product.quantity <= 0) {
      message.error("Vui lòng nhập số lượng hợp lệ");
      return;
    }
    dispatch(addToCart(product));
    openNotification();
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="text-sm sm:text-base lg:text-lg">MÔ TẢ SẢN PHẨM</div>
      ),
      children: <DescriptionDetail />,
    },
    
  ];

  const items1 =[
    {
      key: "2",
      label: (
        <div className="text-sm sm:text-base lg:text-lg">
          THÔNG TIN ĐÁNH GIÁ
        </div>
      ),
      children: <RateList {...{ slug }} />,
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 mx-auto">
      {contextHolder}
      <ModalRate
        {...{
          rate,
          setRate,
          setHoverValue,
          hoverValue,
          open,
          setOpen,
          product: {
            _id: productDetail?._id,
            name: productDetail?.name,
            image: productDetail?.mainImage?.url,
            slug: productDetail?.slug,
          },
        }}
      />
      <div className="py-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="text-slate-600 text-sm sm:text-base cursor-pointer">
              <HomeOutlined /> Trang Chủ
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div className="text-slate-800 text-sm sm:text-base cursor-pointer">
              Chi Tiết Sản Phẩm
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {productDetail ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <Carousel arrows infinite={true} autoplay>
                <Image
                  src={productDetail?.mainImage?.url}
                  key={productDetail?.mainImage?.publicId}
                />
                {productDetail?.variants?.length > 0 &&
                  productDetail?.variants?.map((variant) => (
                    <Image src={variant.image.url} key={variant._id} />
                  ))}
              </Carousel>
            </div>
            <div className="w-full">
              <h1 className="text-base sm:text-lg lg:text-xl font-medium mb-2">
                {productDetail.name}
              </h1>
              <div className="text-xl sm:text-xl lg:text-xl font-bold text-rose-700 mb-4">
                {formatPrice(productDetail.price)} đ
              </div>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm mb-4">
                <div className="flex items-center gap-1">
                  <svg
                    fill="#ce1515"
                    xmlns="http://www.w3.org/2000/svg"
                    width={isMobile ? "10px" : "15px"}
                    height={isMobile ? "15px" : "20px"}
                    viewBox="0 0 52 52"
                    enableBackground="new 0 0 52 52"
                    xmlSpace="preserve"
                  >
                    <path d="M20,37.5c0-0.8-0.7-1.5-1.5-1.5h-15C2.7,36,2,36.7,2,37.5v11C2,49.3,2.7,50,3.5,50h15c0.8,0,1.5-0.7,1.5-1.5 V37.5z"></path>
                    <path d="M8.1,22H3.2c-1,0-1.5,0.9-0.9,1.4l8,8.3c0.4,0.3,1,0.3,1.4,0l8-8.3c0.6-0.6,0.1-1.4-0.9-1.4h-4.7 c0-5,4.9-10,9.9-10V6C15,6,8.1,13,8.1,22z"></path>
                    <path d="M41.8,20.3c-0.4-0.3-1-0.3-1.4,0l-8,8.3c-0.6,0.6-0.1,1.4,0.9,1.4h4.8c0,6-4.1,10-10.1,10v6 c9,0,16.1-7,16.1-16H49c1,0,1.5-0.9,0.9-1.4L41.8,20.3z"></path>
                    <path d="M50,3.5C50,2.7,49.3,2,48.5,2h-15C32.7,2,32,2.7,32,3.5v11c0,0.8,0.7,1.5,1.5,1.5h15c0.8,0,1.5-0.7,1.5-1.5 V3.5z"></path>
                  </svg>
                  <span> Đổi trả dễ dàng</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width={isMobile ? "10px" : "15px"}
                    height={isMobile ? "10px" : "15px"}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7905 15.17C10.5905 15.17 10.4005 15.09 10.2605 14.95L7.84055 12.53C7.55055 12.24 7.55055 11.76 7.84055 11.47C8.13055 11.18 8.61055 11.18 8.90055 11.47L10.7905 13.36L15.0905 9.06003C15.3805 8.77003 15.8605 8.77003 16.1505 9.06003C16.4405 9.35003 16.4405 9.83003 16.1505 10.12L11.3205 14.95C11.1805 15.09 10.9905 15.17 10.7905 15.17Z"
                      fill="#dc0000"
                    ></path>
                    <path
                      d="M12.0009 22.75C11.3709 22.75 10.7409 22.54 10.2509 22.12L8.67086 20.76C8.51086 20.62 8.11086 20.48 7.90086 20.48H6.18086C4.70086 20.48 3.50086 19.28 3.50086 17.8V16.09C3.50086 15.88 3.36086 15.49 3.22086 15.33L1.87086 13.74C1.05086 12.77 1.05086 11.24 1.87086 10.27L3.22086 8.68C3.36086 8.52 3.50086 8.13 3.50086 7.92V6.2C3.50086 4.72 4.70086 3.52 6.18086 3.52H7.91086C8.12086 3.52 8.52086 3.37 8.68086 3.24L10.2609 1.88C11.2409 1.04 12.7709 1.04 13.7509 1.88L15.3309 3.24C15.4909 3.38 15.8909 3.52 16.1009 3.52H17.8009C19.2809 3.52 20.4809 4.72 20.4809 6.2V7.9C20.4809 8.11 20.6309 8.51 20.7709 8.67L22.1309 10.25C22.9709 11.23 22.9709 12.76 22.1309 13.74L20.7709 15.32C20.6309 15.48 20.4809 15.88 20.4809 16.09V17.79C20.4809 19.27 19.2809 20.47 17.8009 20.47H16.1009C15.8909 20.47 15.4909 20.62 15.3309 20.75L13.7509 22.11C13.2609 22.54 12.6309 22.75 12.0009 22.75ZM6.18086 5.02C5.53086 5.02 5.00086 5.55 5.00086 6.2V7.91C5.00086 8.48 4.73086 9.21 4.36086 9.64L3.01086 11.23C2.66086 11.64 2.66086 12.35 3.01086 12.76L4.36086 14.35C4.73086 14.79 5.00086 15.51 5.00086 16.08V17.79C5.00086 18.44 5.53086 18.97 6.18086 18.97H7.91086C8.49086 18.97 9.22086 19.24 9.66086 19.62L11.2409 20.98C11.6509 21.33 12.3709 21.33 12.7809 20.98L14.3609 19.62C14.8009 19.25 15.5309 18.97 16.1109 18.97H17.8109C18.4609 18.97 18.9909 18.44 18.9909 17.79V16.09C18.9909 15.51 19.2609 14.78 19.6409 14.34L21.0009 12.76C21.3509 12.35 21.3509 11.63 21.0009 11.22L19.6409 9.64C19.2609 9.2 18.9909 8.47 18.9909 7.89V6.2C18.9909 5.55 18.4609 5.02 17.8109 5.02H16.1109C15.5309 5.02 14.8009 4.75 14.3609 4.37L12.7809 3.01C12.3709 2.66 11.6509 2.66 11.2409 3.01L9.66086 4.38C9.22086 4.75 8.48086 5.02 7.91086 5.02H6.18086Z"
                      fill="#dc0000"
                    ></path>
                  </svg>
                  <span> Chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    fill="#dc0000"
                    width={isMobile ? "10px" : "15px"}
                    height={isMobile ? "10px" : "15px"}
                    viewBox="0 -64 640 640"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                    </g>
                  </svg>
                  <span>Giao hàng toàn quốc</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gradient-to-t from-red-50 to-rose-100 p-4 rounded-md mb-6">
                <div className="font-bold flex items-center gap-2 text-red-600">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M21.9999 8.16234L21.9999 8.23487C21.9999 9.09561 21.9999 9.52598 21.7927 9.8781C21.5855 10.2302 21.2093 10.4392 20.4569 10.8572L19.6636 11.298C20.2102 9.44984 20.3926 7.46414 20.4601 5.76597C20.4629 5.69316 20.4662 5.61945 20.4695 5.54497L20.4718 5.49279C21.1231 5.71896 21.4887 5.88758 21.7168 6.20408C22 6.59692 22 7.11873 21.9999 8.16234Z"
                        fill="#d02729"
                      ></path>
                      <path
                        d="M2 8.16234L2 8.23487C2.00003 9.09561 2.00004 9.52598 2.20723 9.8781C2.41442 10.2302 2.79063 10.4392 3.54305 10.8572L4.33681 11.2982C3.79007 9.45001 3.60767 7.46422 3.54025 5.76597C3.53736 5.69316 3.5341 5.61945 3.53081 5.54497L3.5285 5.49266C2.87701 5.7189 2.51126 5.88752 2.2831 6.20408C1.99996 6.59692 1.99997 7.11873 2 8.16234Z"
                        fill="#d02729"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.3771 2.34674C15.2531 2.15709 13.7837 2 12.0002 2C10.2166 2 8.74724 2.15709 7.62318 2.34674C6.48445 2.53887 5.91508 2.63494 5.43937 3.22083C4.96365 3.80673 4.98879 4.43998 5.03907 5.70647C5.21169 10.0544 6.14996 15.4851 11.25 15.9657V19.5H9.8198C9.34312 19.5 8.93271 19.8365 8.83922 20.3039L8.65 21.25H6C5.58579 21.25 5.25 21.5858 5.25 22C5.25 22.4142 5.58579 22.75 6 22.75H18C18.4142 22.75 18.75 22.4142 18.75 22C18.75 21.5858 18.4142 21.25 18 21.25H15.35L15.1608 20.3039C15.0673 19.8365 14.6569 19.5 14.1802 19.5H12.75V15.9657C17.8503 15.4853 18.7886 10.0545 18.9612 5.70647C19.0115 4.43998 19.0367 3.80673 18.5609 3.22083C18.0852 2.63494 17.5159 2.53887 16.3771 2.34674Z"
                        fill="#d02729"
                      ></path>
                    </g>
                  </svg>
                  <span>Top bán chạy</span>
                </div>
                <div className="font-medium mt-2 text-[#d1402c]">
                  Sản phẩm bán chạy
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Màu sắc: {product.color}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {productDetail?.variants?.map((variant, index) => (
                      <div
                        onClick={() => {
                          handleChangeProduct("color", variant.color);
                          handleChangeProduct("image", variant.image.url);
                        }}
                        key={`color${index}`}
                        className="cursor-pointer"
                      >
                        <img
                          className={`w-12 h-12 rounded-full border-2 ${
                            variant.color === product.color
                              ? "border-black"
                              : "border-gray-300"
                          }`}
                          src={variant.image.url}
                          alt={variant.color}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    Size: {product.size}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {size?.map((itemSize, index) => (
                      <button
                        onClick={() => handleChangeProduct("size", itemSize)}
                        key={index}
                        className={`w-10 h-10 rounded-full font-bold border-2 ${
                          product.size === itemSize
                            ? "bg-slate-950 text-slate-50"
                            : "bg-slate-50 text-slate-950 border-gray-300"
                        }`}
                      >
                        {itemSize}
                      </button>
                    ))}
                  </div>
                </div>
                {/* <button className="text-red-700 font-bold">Bảng Size</button> */}
                <div>
                  <h2 className="text-lg font-semibold mb-2">Số lượng:</h2>
                  <TextInput
                    type="number"
                    value={product.quantity}
                    onChange={(e) => {
                      if (e.target.value > 0 || e.target.value === "") {
                        handleChangeProduct("quantity", e.target.value);
                      }
                    }}
                    className="w-24"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-slate-950 text-slate-50 py-3 rounded-md text-lg font-bold mt-6"
              >
                Thêm giỏ hàng
              </button>
              
            </div>
          </div>
          
          <div className="mt-8">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
          <div className="mt-8">
            <Tabs defaultActiveKey="1" items={items1} />
          </div>
          <div className="bg-gradient-to-t from-slate-400 to-red-300 rounded-md p-4 mt-6">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Đánh giá sản phẩm
                </h3>
                <div className="flex justify-center">
                  <Rate
                    value={rate}
                    onHoverChange={setHoverValue}
                    onChange={(value) => {
                      setRate(value);
                      setOpen(true); 
                    }}
                    character={({ index = 0 }) => customIcons()[index + 1]}
                  />
                </div>
              </div>
          {productHome.length > 0 &&
            productHome.map((item, index) => {
              if (item.products.length > 0) {
                return (
                  <React.Fragment key={item.category._id || index}>
                    <ProductList
                      title={"SẢN PHẨM KHÁC"}
                      products={item?.products}
                      isPagination={false}
                    />
                    <div
                      onClick={() =>
                        navigate(`/category/${item.category.slug}`)
                      }
                      className="flex items-center justify-center pb-8"
                    >
                      <div className="w-40 bg-slate-900 py-4 px-2 text-slate-50 font-medium text-center rounded-lg cursor-pointer">
                        Xem thêm
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
              return null;
            })}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <img src={empty} alt="Empty" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default Detail;
