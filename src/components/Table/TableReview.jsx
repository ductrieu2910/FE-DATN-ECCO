import {
  Pagination,
  Table,
  Rate,
  Image,
  Tooltip,
  Popconfirm,
  Switch,
  message,
} from "antd";
import React, { useState } from "react";
import { formatDateReview } from "../../helpers/formatDate";
import { createIcon } from "../../helpers/createIcon";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteReview,
  getReviewlist,
  updateReview,
} from "../../redux/review/review.thunk";
import { deleteFile } from "../../helpers/uploadCloudinary";

const TableReview = ({
  reviews = [],
  isLoading = false,
  page,
  pageSize,
  totalItems,
  setPaginate,
}) => {
  const dispatch = useDispatch();
  const [loadingAction, setLoadingAction] = useState(false);

  const handleToggleDisplay = ({ id, display }) => {
    setLoadingAction(true);
    dispatch(updateReview({ id, data: { display } })).then((res) => {
      if (res.payload.success) {
        message.success(res.payload.message);
        dispatch(
          getReviewlist({
            page,
            pageSize,
          })
        );
        setLoadingAction(false);
      }
    });
  };

  const removeReview = (review) => {
    setLoadingAction(true);
    dispatch(deleteReview(review._id)).then(async (res) => {
      if (res.payload.success) {
        if (review.images && review.images.length > 0) {
          for (const image of review.images) {
            if (image.publicId) {
              await deleteFile(image.publicId);
            }
          }
        }
        message.success(res.payload.message);
        dispatch(
          getReviewlist({
            page,
            pageSize,
          })
        );
        setLoadingAction(false);
      }
    });
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      width: 60,
      render: (text, record, index) => {
        const displayIndex = (page - 1) * pageSize + index + 1;
        return <p>{displayIndex}</p>;
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product, record) => {
        if (!product) {
          return <div>Không có thông tin sản phẩm</div>;
        }
        return (
          <div>
            <div className="flex items-center mb-2 gap-2">
              {product.mainImage && product.mainImage.url ? (
                <Image
                  width={80}
                  height={80}
                  src={product.mainImage.url}
                  alt={"Image-Product"}
                  className="mr-2 rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mr-2 rounded-lg">
                  No Image
                </div>
              )}
              <div>
                <div className="max-w-60 py-1 truncate-2-lines font-medium">
                  {product.name || "Không có tên sản phẩm"}
                </div>
                <Rate
                  disabled
                  defaultValue={record.rate}
                  character={({ index }) =>
                    createIcon({ index: index + 1, rate: parseInt(record.rate) })
                  }
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ),
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      ellipsis: true,
      render: (comment, record) => (
        <div>
          <p>{comment}</p>
          {record.images && record.images.length > 0 && (
            <div className="mt-2">
              <Image.PreviewGroup>
                {record.images.map((image, index) => (
                  <Image
                    key={index}
                    width={80}
                    height={80}
                    src={image.url}
                    alt={`Review Image ${index + 1}`}
                    className="mr-2 mb-2"
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (text) => <p>{formatDateReview(text)}</p>,
    },
    {
      title: "Thao Tác",
      key: "action",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-2 items-center text-[#00246a]">
          <Tooltip title={record.display ? "Ẩn" : "Hiển thị"}>
            <Switch
              checked={record.display}
              onChange={(checked) =>
                handleToggleDisplay({ id: record._id, display: checked })
              }
            />
          </Tooltip>
          <Popconfirm
            className="max-w-40"
            placement="topLeft"
            title={"Xác nhận xóa thông tin đánh giá"}
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => removeReview(record)}
            destroyTooltipOnHide={true}
          >
            <Tooltip title="Xóa">
              <button className="p-2 border-2 rounded-md cursor-pointer hover:bg-[#edf1ff] transition-colors">
                <MdOutlineDeleteOutline />
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleChangePage = (key, value) => {
    setPaginate((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="py-2">
      <Table
        scroll={{ x: true }}
        loading={isLoading || loadingAction}
        columns={columns}
        dataSource={reviews}
        pagination={false}
        rowKey="_id"
      />
      {reviews?.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
           current={page}
           pageSize={pageSize}
           total={totalItems}
           onChange={(page) => handleChangePage("page", page)}
           onShowSizeChange={(_, size) => handleChangePage("pageSize", size)}
           showSizeChanger
          />
        </div>
      )}
    </div>
  );
};

export default TableReview;