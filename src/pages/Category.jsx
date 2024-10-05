import { Breadcrumb } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HomeOutlined, SendOutlined } from "@ant-design/icons";
import { Card } from "antd";
import banner from "../resources/banner-ecco5.jpg";
import ProductList from "../components/ProductList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByCategory } from "../redux/product/product.thunk";

const Category = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.product);
  const paginate = useSelector((state) => state.product.pagination);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    totalPage: 0,
    totalItems: 0,
  });

  useEffect(() => {
    if (slug) {
      dispatch(
        getProductByCategory({
          slug,
          page: pagination.page,
          pageSize: pagination.pageSize,
        })
      );
    }
  }, [slug, pagination.page, pagination.pageSize]);

  useEffect(() => {
    if (paginate) {
      setPagination((prev) => ({
        ...prev,
        page: paginate?.page,
        pageSize: paginate?.pageSize,
        totalPage: paginate?.totalPage,
        totalItems: paginate?.totalItems,
      }));
    }
  }, [paginate]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="py-4 sm:py-6 lg:px-16">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="text-slate-600 text-sm sm:text-base cursor-pointer">
              <HomeOutlined /> Trang chủ
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div className="text-slate-800 text-sm sm:text-base cursor-pointer">
              Danh mục sản phẩm
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="text-sm sm:text-base py-4 flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4">
            <Card title="Danh mục sản phẩm" bordered={false}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {categories.length > 0 &&
                  categories?.map((category) => (
                    <div
                      onClick={() => navigate(`/category/${category.slug}`)}
                      key={category._id}
                      className={`${
                        category.slug === slug ? "bg-slate-100" : ""
                      } py-2 sm:py-3 hover:bg-slate-100 px-2 rounded-md cursor-pointer text-sm sm:text-base`}
                    >
                      <SendOutlined className="pr-1" /> {category.name}
                    </div>
                  ))}
              </div>
            </Card>
          </div>
          <div className="flex-grow lg:w-3/4">
            <Card title="Danh sách sản phẩm" bordered={false}>
              <img
                className="w-full rounded-md"
                src={banner}
                alt="banner-image"
              />
              {products?.length > 0 ? (
                <ProductList
                  {...{
                    products,
                    setPagination,
                    pagination,
                  }}
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
    </div>
  );
};

export default Category;
