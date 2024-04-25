import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import

// import useAsync from "hooks/useAsync";
import { SidebarContext } from "context/SidebarContext";
// import CategoryServices from "services/CategoryServices";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
// import DeleteModal from "components/modal/DeleteModal";
// import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import PageTitle from "components/Typography/PageTitle";
import MainDrawer from "components/drawer/MainDrawer";
// import CategoryDrawer from "components/drawer/CategoryDrawer";
// import UploadManyTwo from "components/common/UploadManyTwo";
import SwitchToggleChildCat from "components/form/SwitchToggleChildCat";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import CategoryTable from "components/category/CategoryTable";
import NotFound from "components/table/NotFound";
// import categoryData from "utils/categories";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import CategoryDrawer from "components/drawer/CategoryDrawer";
import requests from "services/httpService";
import useAsync from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import Loading from "components/preloader/Loading";

const Category = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);

  // const { data, loading } = useAsync(CategoryServices.getAllCategory);
  // const { data: getAllCategories } = useAsync(CategoryServices.getAllCategories);
  // const data = categoryData;
  // console.log("datas :", data);
  const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();
  const { data, loading } = useAsync(CategoryServices.getAllCategory);

  const { t } = useTranslation();

  const {
    handleSubmitCategory,
    categoryRef,
    totalResults,
    resultsPerPage,
    dataTable,
    limitData,
    serviceData,
    handleChangePage,
    // filename,
    // isDisabled,
    // handleSelectFile,
    // handleUploadMultiple,
    // handleRemoveSelectFile,
  } = useFilter(data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  // previous Logic

  // const handleSelectAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(data[0].children.map((li) => li._id));

  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  // console.log("alID : ", allId);
  // console.log("Service Id : ", serviceId);
  //Added By : Govinda 29/2/2024
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);

    if (!isCheckAll) {
      const selectedIds = data.map(category => category._id);
      console.log("Selected IDs:", selectedIds);
      setIsCheck(selectedIds);
    } else {
      console.log("Deselecting all IDs");
      setIsCheck([]);
    }
  };

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       console.log("Fetching categories...");
  //       const response = await requests.get('/api/category/all');
  //       console.log("Categories fetched successfully:", response);
  //       setCategories(response);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();

  // // Polling mechanism
  // const intervalId = setInterval(fetchCategories, 1000); // Fetch every 5 seconds

  // // Clear interval on unmount
  // return () => clearInterval(intervalId);
  // }, []);
  // const handleSubmitCategory = () => { };
  // const categoryRef = useRef();
  // const handleChangePage = () => { };

  return (
    <>
      <PageTitle>{t("Category")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <BulkActionDrawer ids={allId} title="Categories" />

      <MainDrawer>
        <CategoryDrawer id={serviceId} categories={data} lang={lang} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          {/* <div className="flex md:flex-row flex-col gap-3 justify-end items-end"> */}
          <form onSubmit={handleSubmitCategory} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            {/* </div> */}
            <div className="flex justify-start w-1/2 xl:w-1/2 md:w-full">
              {/* <UploadManyTwo
                title="Categories"
                exportData={getAllCategories}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              /> */}
            </div>

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 text-gray-600 btn-gray"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>

                  {t("BulkAction")}
                </Button>
              </div>
              <div className="w-full md:w-32 lg:w-32 xl:w-32  mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 bg-red-500 disabled  btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("AddCategory")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitCategory}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={categoryRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={t("SearchCategory")}
              />
            </div>
          </form>
        </CardBody>
      </Card>

      <SwitchToggleChildCat
        title=" "
        handleProcess={setShowChild}
        processOption={showChild}
        name={showChild}
      />
      {loading
        // false
        ? (

          <TableLoading row={12} col={6} width={190} height={20} />
        ) :
        serviceData?.length !== 0
          // true
          ?
          (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>
                      <CheckBox
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        handleClick={handleSelectAll}
                        isChecked={isCheckAll}
                      />
                    </TableCell>

                    <TableCell>{t("catIdTbl")}</TableCell>
                    <TableCell>{t("catIconTbl")}</TableCell>
                    <TableCell>{t("CatTbName")}</TableCell>
                    <TableCell>{t("CatTbDescription")}</TableCell>
                    <TableCell className="text-center">{t("catPublishedTbl")}</TableCell>
                    <TableCell className="text-right">{t("catActionsTbl")}</TableCell>
                  </tr>
                </TableHeader>

                <CategoryTable
                  data={data}
                  lang={lang}
                  isCheck={isCheck}
                  categories={dataTable}
                  setIsCheck={setIsCheck}
                  showChild={showChild}
                />
              </Table>

              <TableFooter>
                <Pagination
                  totalResults={totalResults}
                  // totalResults={data?.length}
                  resultsPerPage={resultsPerPage}
                  // resultsPerPage={resultsPerPage}
                  onChange={handleChangePage}
                  label="Table navigation"
                />
                {/* <Pagination
                  totalResults={10}
                  resultsPerPage={2}
                  onChange={handleChangePage}
                  label="Table navigation"
                /> */}
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Sorry, There are no categories right now." />
          )}
    </>
  );
};

export default Category;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CategoryServices from 'services/CategoryServices';

// const Category = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         console.log("Fetching categories...");
//         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBiOTAwYjE5ODg3ZmY1M2ZiODhmZGQiLCJpYXQiOjE3MTIwNTY4MzcsImV4cCI6MTcxMjA2MDQzN30.XNuVW1X9LQF_kt_MY4-EmuUp_bakWp6AYybd2N4M5HM';
//         const response = await axios.get('http://localhost:4000/category', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         console.log("Categories fetched successfully:", response.data);
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleDeleteCategory = async (id) => {
//     try {
//       console.log("Deleting category...");
//       const deleteResponse = await CategoryServices.deleteCategory(id);
//       if (deleteResponse.success) {
//         console.log("Category deleted successfully");
//         setCategories(categories.filter(category => category._id !== id));
//       } else {
//         console.error("Failed to delete category:", deleteResponse.message);
//       }
//     } catch (error) {
//       console.error('Error deleting category:', error);
//     }
//   };
//   return (
//     <div>
//       <h2>Categories</h2>
//       {categories.map(category => (
//         <div key={category._id}>
//           <span>{category.name}</span>
//           <button onClick={() => {
//             console.log("Category ID:", category._id);
//             handleDeleteCategory(category._id);
//           }}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;
