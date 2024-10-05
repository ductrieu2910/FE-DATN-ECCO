import React, { lazy, Suspense } from "react";
import Page from "../components/Layout/Page";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapperAdmin = lazy(() =>
  import("../components/Auth/AuthWapperAdmin")
);

const LayoutAdmin = lazy(() => import("../components/Layout/LayoutAdmin"));
const LoginAdmin = lazy(() => import("../pages/LoginAdmin"));
const Dashboard = lazy(() => import("../pages/DashBoard"));
const ManageProduct = lazy(() => import("../pages/ManageProduct"));
const CreateProduct = lazy(() => import("../pages/CreateProduct"));
const ManageUser = lazy(() => import("../pages/ManageUser"));
const ManageOrder = lazy(() => import("../pages/ManageOrder"));
const ManageReview = lazy(() => import("../pages/ManageReview"));
const ManageCategory = lazy(() => import("../pages/ManageCategory"));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticatedAdmin, isLoading } = useSelector(
    (state) => state.auth
  );
  if (!isAuthenticatedAdmin && !isLoading) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticatedAdmin, isLoading } = useSelector(
    (state) => state.auth
  );
  if (isAuthenticatedAdmin && !isLoading) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};


const AdminRoutes = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthWrapperAdmin>
          <Page title={"ECCO | Đăng Nhập Admin"}>
            <AuthRoute>
              <LoginAdmin />
            </AuthRoute>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthWrapperAdmin>
          <Page title={"ECCO | Dashboard"}>
            <LayoutAdmin title={"THÔNG TIN THỐNG KÊ"}>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <Suspense fallback={<Loading />}>
       <AuthWrapperAdmin>
          <Page title={"ECCO | Quản lý sản phẩm"}>
            <LayoutAdmin title={"QUẢN LÝ SẢN PHẨM"}>
              <ProtectedRoute>
                <ManageProduct />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/products/create",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthWrapperAdmin>
          <Page title={"ECCO | Thêm sản phẩm"}>
            <LayoutAdmin title={"THÊM MỚI SẢN PHẨM"}>
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<Loading />}>
         <AuthWrapperAdmin>
          <Page title={"ECCO | Quản lý người dùng"}>
            <LayoutAdmin title={"QUẢN LÝ NGƯỜI DÙNG"}>
              <ProtectedRoute>
                <ManageUser />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <Suspense fallback={<Loading />}>
          <AuthWrapperAdmin>
          <Page title={"ECCO | Quản lý đơn hàng"}>
            <LayoutAdmin title={"QUẢN LÝ ĐƠN HÀNG"}>
              <ProtectedRoute>
                <ManageOrder />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/reviews",
    element: (
      <Suspense fallback={<Loading />}>
         <AuthWrapperAdmin>
          <Page title={"ECCO | Quản lý đánh giá"}>
            <LayoutAdmin title={"QUẢN LÝ ĐÁNH GIÁ"}>
              <ProtectedRoute>
                <ManageReview />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthWrapperAdmin>
          <Page title={"ECCO | Quản lý danh mục"}>
            <LayoutAdmin title={"QUẢN LÝ DANH MỤC"}>
              <ProtectedRoute>
                <ManageCategory />
              </ProtectedRoute>
            </LayoutAdmin>
          </Page>
        </AuthWrapperAdmin>
      </Suspense>
    ),
  },
];

export default AdminRoutes;
