import React, { useState, useEffect } from "react";
import {
  UploadOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { uploadFile, deleteFile } from "../helpers/uploadCloudinary";
import { getAccountCustomer, updateAccount } from "../redux/auth/auth.thunk";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    password: "",
    avatar: {
      url: userInfo?.avatar?.url || "",
      publicId: userInfo?.avatar?.publicId || "",
    },
    rePassword: "",
  });
  const [newAvatar, setNewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (key, value) => {
    setInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      try {
        setLoading(true);
        const promises = Array.from(files).map(async (file) => {
          const result = await uploadFile(file);
          return {
            url: result.secure_url,
            publicId: result.public_id,
          };
        });
        const newAvatars = await Promise.all(promises);
        setNewAvatar(newAvatars[0]);
        setInput((prev) => ({
          ...prev,
          avatar: newAvatars[0],
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Có lỗi xảy ra khi tải lên ảnh. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoading(true);
      if (
        input.avatar.publicId &&
        input.avatar.publicId !== userInfo?.avatar?.publicId
      ) {
        await deleteFile(input.avatar.publicId);
      }
      setNewAvatar(null);
      setInput((prev) => ({
        ...prev,
        avatar: {
          url: userInfo?.avatar?.url || "",
          publicId: userInfo?.avatar?.publicId || "",
        },
      }));
    } catch (error) {
      console.error("Error deleting avatar:", error);
      message.error("Có lỗi xảy ra khi xóa ảnh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!input.name) {
      message.error("Vui lòng nhập họ tên");
      return;
    }
    if (input.password !== input.rePassword) {
      message.error("Vui lòng mật khẩu nhập lại không trùng khớp");
      return;
    }
    dispatch(updateAccount(input)).then((res) => {
      if (res.payload.success) {
        message.success("Lưu thông tin hồ sơ thành công");
        dispatch(getAccountCustomer());
        setNewAvatar(null);
      }
    });
  };

  return (
    <div className="text-xs md:text-base xl:text-base 2xl:text-base">
      <div className="font-bold">Thông tin người dùng</div>
      <form onSubmit={handleConfirm}>
        <div className="avatar py-4 flex flex-col items-center justify-center">
          <div className="w-16 md:w-20 rounded-full">
            <img
              src={input.avatar.url || userInfo?.avatar?.url}
              alt="User avatar"
            />
          </div>
          {input.avatar.publicId !== userInfo?.avatar?.publicId && (
            <button
              type="button"
              onClick={handleDeleteAvatar}
              className="mt-2 bg-red-500 text-white rounded-md px-2 py-1 text-sm flex items-center"
              disabled={loading}
            >
              <DeleteOutlined className="text-2xl" />
            </button>
          )}
        </div>
        <div className="font-medium flex items-center justify-center py-4">
          {!newAvatar && (
            <label className="w-32 py-2 px-2 text-center cursor-pointer border-dashed border-2 border-slate-950 relative">
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
                disabled={loading}
              />
              {loading ? (
                <LoadingOutlined className="mr-2" />
              ) : (
                <UploadOutlined className="mr-2" />
              )}
              {loading ? "Đang tải..." : "Tải lên"}
            </label>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full xl:w-110 2xl:w-110">
            <div className="py-2 font-medium">Họ tên:</div>
            <input
              value={input.name}
              onChange={(e) => handleChangeInput("name", e.target.value)}
              type="text"
              className="input input-bordered w-full input-md"
            />
          </div>
          <div className="w-full xl:w-110 2xl:w-110">
            <div className="py-2 font-medium">Email:</div>
            <input
              value={input.email}
              disabled
              type="text"
              className="input input-bordered w-full input-md"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full xl:w-110 2xl:w-110">
            <div className="py-2 font-medium">Mật khẩu mới:</div>
            <input
              value={input.password}
              onChange={(e) => handleChangeInput("password", e.target.value)}
              type="password"
              className="input input-bordered w-full input-md"
            />
          </div>
          <div className="w-full xl:w-110 2xl:w-110">
            <div className="py-2 font-medium">Nhập lại mật khẩu:</div>
            <input
              value={input.rePassword}
              onChange={(e) => handleChangeInput("rePassword", e.target.value)}
              type="password"
              className="input input-bordered w-full input-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-black py-3 rounded-md text-slate-50 font-bold text-center cursor-pointer"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default Profile;
