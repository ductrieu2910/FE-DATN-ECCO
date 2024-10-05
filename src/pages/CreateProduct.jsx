import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Label, Select, TextInput, Button, Spinner } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { uploadFile, deleteFile } from "../helpers/uploadCloudinary";
import { validateCreateProduct } from "../validate/validate";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAdmin } from "../redux/category/category.thunk";
import { createProduct } from "../redux/product/product.thunk";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const VALIDATE = {
  name: { isValid: true, message: "" },
  category: { isValid: true, message: "" },
  price: { isValid: true, message: "" },
  mainImage: { isValid: true, message: "" },
  variants: { isValid: true, message: "" },
  description: { isValid: true, message: "" },
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    mainImage: {
      url: "",
      publicId: "",
    },
    variants: [
      {
        color: "",
        image: {
          url: "",
          publicId: "",
        },
      },
    ],
    description: "",
  });
  const [loading, setLoading] = useState({
    mainImage: false,
    variants: {},
  });
  const [validate, setValidate] = useState(VALIDATE);

  useEffect(() => {
    dispatch(getCategoryAdmin());
  }, []);

  const handleInputChange = (field, value) => {
    setProduct({ ...product, [field]: value });
    setValidate((prev) => ({
      ...prev,
      [field]: { isValid: true, message: "" },
    }));
  };

  const handleMainImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading((prev) => ({ ...prev, mainImage: true }));
        const result = await uploadFile(file);
        handleInputChange("mainImage", {
          url: result.secure_url,
          publicId: result.public_id,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error("Có lỗi xảy ra khi tải lên ảnh chính. Vui lòng thử lại.");
      } finally {
        setLoading((prev) => ({ ...prev, mainImage: false }));
      }
    }
  };

  const handleVariantImageUpload = async (index, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading((prev) => ({
          ...prev,
          variants: { ...prev.variants, [index]: true },
        }));
        const result = await uploadFile(file);
        const newVariants = [...product.variants];
        newVariants[index].image = {
          url: result.secure_url,
          publicId: result.public_id,
        };
        handleInputChange("variants", newVariants);
      } catch (error) {
        console.error("Error uploading file:", error);
        message.error(
          "Có lỗi xảy ra khi tải lên ảnh biến thể. Vui lòng thử lại."
        );
      } finally {
        setLoading((prev) => ({
          ...prev,
          variants: { ...prev.variants, [index]: false },
        }));
      }
    }
  };

  const handleRemoveImage = async (field, index = null) => {
    let imageData;
    if (field === "mainImage") {
      imageData = product.mainImage;
      handleInputChange("mainImage", { url: "", publicId: "" });
    } else if (field === "variants") {
      imageData = product.variants[index].image;
      const newVariants = [...product.variants];
      newVariants[index].image = { url: "", publicId: "" };
      handleInputChange("variants", newVariants);
    }
    if (imageData.publicId) {
      try {
        setLoading((prev) => ({
          ...prev,
          [field]: index !== null ? { ...prev[field], [index]: true } : true,
        }));
        await deleteFile(imageData.publicId);
      } catch (error) {
        console.error("Error deleting file:", error);
      } finally {
        setLoading((prev) => ({
          ...prev,
          [field]: index !== null ? { ...prev[field], [index]: false } : false,
        }));
      }
    }
  };

  const addVariants = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { color: "", image: { url: "", publicId: "" } },
      ],
    });
  };

  const removeVariant = async (index) => {
    const variant = product.variants[index];
    setValidate((prev) => ({
      ...prev,
      variants: { isValid: true, message: "" },
    }));
    if (variant.image.publicId) {
      try {
        setLoading((prev) => ({
          ...prev,
          variants: { ...prev.variants, [index]: true },
        }));
        await deleteFile(variant.image.publicId);
      } catch (error) {
        console.error("Error deleting file:", error);
      } finally {
        setLoading((prev) => ({
          ...prev,
          variants: { ...prev.variants, [index]: false },
        }));
      }
    }
    setProduct({
      ...product,
      variants: product.variants.filter((_, i) => i !== index),
    });
  };

  const handleColorChange = (index, value) => {
    const newVariants = [...product.variants];
    newVariants[index].color = value;
    handleInputChange("variants", newVariants);
  };

  const isAnyVariantUploading = () => {
    return Object.values(loading.variants)?.some((isLoading) => isLoading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCreateProduct({ product, setValidate })) return;
    dispatch(createProduct(product)).then((result) => {
      if (result.payload.success) {
        message.success(result.payload.message);
        navigate("/admin/products");
      }
    });
  };

  return (
    <div className="py-6 max-w-7xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Card bordered={false} className="shadow-lg w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-6">
                <Label
                  htmlFor="name"
                  value="Tên sản phẩm"
                  className="mb-2 block"
                />
                <TextInput
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  value={product.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  helperText={
                    !validate.name.isValid ? (
                      <p className="text-red-500">{validate.name.message}</p>
                    ) : (
                      ""
                    )
                  }
                  color={!validate.name.isValid ? "failure" : ""}
                />
              </div>

              <div className="mb-6">
                <Label
                  htmlFor="category"
                  value="Danh mục sản phẩm"
                  className="mb-2 block"
                />
                <Select
                  id="category"
                  value={product.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  helperText={
                    !validate.category.isValid ? (
                      <p className="text-red-500">
                        {validate.category.message}
                      </p>
                    ) : (
                      ""
                    )
                  }
                  color={!validate.category.isValid ? "failure" : ""}
                >
                  <option value="">Chọn danh mục</option>
                  {categories &&
                    categories.length > 0 &&
                    categories?.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </Select>
              </div>

              <div className="mb-6">
                <Label htmlFor="price" value="Giá" className="mb-2 block" />
                <TextInput
                  id="price"
                  type="number"
                  placeholder="Nhập giá"
                  value={product.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  helperText={
                    !validate.price.isValid ? (
                      <p className="text-red-500">{validate.price.message}</p>
                    ) : (
                      ""
                    )
                  }
                  color={!validate.price.isValid ? "failure" : ""}
                />
              </div>

              <div className="mb-6">
                <Label value="Ảnh hiển thị" className="mb-2 block" />
                <div
                  className={`border-2 border-dashed ${
                    validate.mainImage.isValid
                      ? "border-gray-300"
                      : "border-red-500"
                  } rounded-lg p-4`}
                >
                  {loading.mainImage ? (
                    <div className="flex items-center justify-center w-full h-60">
                      <Spinner size="xl" />
                    </div>
                  ) : product.mainImage.url ? (
                    <div className="relative w-full h-60 flex items-center justify-center">
                      <img
                        src={product.mainImage.url}
                        alt="Display"
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                      <Button
                        color="failure"
                        size="xs"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveImage("mainImage")}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-60 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg">
                      <FaPlusCircle className="text-4xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Upload</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleMainImageUpload}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
                {!validate.mainImage.isValid && (
                  <p className="text-red-500 py-2">
                    {validate.mainImage.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-6">
                <Label value="Phân loại" className="mb-2 block" />
                {product.variants.map((variant, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-4 ${
                      !validate.variants.isValid &&
                      (!variant.color || !variant.image.url)
                        ? "border-red-300"
                        : "border-gray-500"
                    } border rounded`}
                  >
                    <div className="flex gap-2 items-center mb-2">
                      <TextInput
                        type="text"
                        placeholder="Nhập màu"
                        value={variant.color}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        color="failure"
                        onClick={() => removeVariant(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                    <div className="mt-2">
                      {loading.variants[index] ? (
                        <div className="flex items-center justify-center w-full h-40">
                          <Spinner size="xl" />
                        </div>
                      ) : variant.image.url ? (
                        <div className="relative w-full h-40 flex items-center justify-center">
                          <img
                            src={variant.image.url}
                            alt={`Color ${variant.color}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                          <Button
                            color="failure"
                            size="xs"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveImage("variants", index)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                          <FaPlusCircle className="text-4xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Upload</span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleVariantImageUpload(index, e)}
                          />
                        </label>
                      )}
                    </div>
                    {!validate.variants.isValid &&
                      (!variant.color || !variant.image.url) && (
                        <p className="text-red-500 py-2">
                          {validate.variants.message}
                        </p>
                      )}
                  </div>
                ))}
                <Button
                  color="success"
                  onClick={addVariants}
                  className="w-full"
                  disabled={loading.mainImage || isAnyVariantUploading()}
                >
                  Thêm phân loại
                </Button>
              </div>
            </div>
          </div>

          {/* Full-width description field */}
          <div className="mt-6">
            <Label value="Mô tả" className="mb-2 block" />
            <ReactQuill
              theme="snow"
              placeholder="Nhập mô tả sản phẩm"
              value={product.description}
              onChange={(value) => handleInputChange("description", value)}
              style={{ height: "200px", marginBottom: "50px" }}
            />
            {!validate.description.isValid && (
              <p className="text-red-500 py-2">
                {validate.description.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-8 flex gap-2 py-2">
            <Button
              onClick={() => navigate("/admin/products")}
              type="button"
              color="primary"
              className="w-24 py-3 bg-gradient-to-t from-[#cd3f34] to-[#ef5051] hover:opacity-80 text-base text-slate-100"
            >
              HỦY
            </Button>
            <Button
              type="submit"
              color="primary"
              className="w-full py-3 bg-gradient-to-t from-[#3b71ca] to-[#405189] hover:opacity-80 text-base text-slate-100"
              disabled={loading.mainImage || isAnyVariantUploading()}
            >
              THÊM SẢN PHẨM
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CreateProduct;
