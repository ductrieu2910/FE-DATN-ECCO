// import React, { useState } from "react";
import React, { useCallback, useEffect, useState } from "react";
import TableCategory from "../components/Table/TableCategory";
import { TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { getCategoryList } from "../redux/category/category.thunk";
import ModalCategoryAction from "../components/Modal/ModalCategoryAction";

const ManageCategory = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 10,
    totalPage: 0,
    totalItems: 0,
  });

  const [filters, setFilters] = useState({
    name: "",
  });
  

  const { categories, pagination, isLoading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategoryList({ ...paginate, ...filters }));
  }, [dispatch, paginate.page, paginate.pageSize, filters]);

  useEffect(() => {
    if (pagination) {
      setPaginate((prev) => ({
        ...prev,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPage: pagination.totalPage,
        totalItems: pagination.totalItems,
      }));
    }
  }, [pagination]);

  const debouncedFilter = useCallback(
    debounce((name, value) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
      setPaginate((prev) => ({ ...prev, page: 1 }));
    }, 300),
    []
  );

  const handleFilterChange = (name, value) => {
    debouncedFilter(name, value);
  };

  return (
    <div className="py-8">
      <ModalCategoryAction
        {...{
          open,
          setOpen,
          page: paginate.page,
          pageSize: paginate.pageSize,
        }}
      />
      <div className="flex gap-2">
        <TextInput
          className="flex-1"
          type="text"
          placeholder="Nhập tên danh mục..."
          rightIcon={HiSearch}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
         <div
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center gap-2 cursor-pointer px-2 py-2 bg-gradient-to-t from-[#3b71ca] to-[#405189] text-center font-medium text-base text-slate-100 w-40 rounded-md"
        >
          <FaPlusCircle /> <span>Thêm danh mục</span>
        </div>
      </div>
      <TableCategory
        categories={categories}
        isLoading={isLoading}
        page={paginate.page}
        pageSize={paginate.pageSize}
        totalItems={paginate.totalItems}
        setPaginate={setPaginate}
      />
    </div>
  );
};

export default ManageCategory;
