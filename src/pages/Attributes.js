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
import AttributeTable from "components/attribute/AttributeTable";
import UploadManyTwo from "components/common/UploadManyTwo";
import AttributeDrawer from "components/drawer/AttributeDrawer";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
// import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import useToggleDrawer from "hooks/useToggleDrawer";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import AttributeServices from "services/AttributeServices";
import requests from "services/httpService";
import LanguageServices from "services/LanguageServices";
// import AttributeServices from "services/AttributeServices";

//internal import

const Attributes = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading } = useAsync(AttributeServices.getAllAttributes);

  // const { data, loading } = useAsync(() =>
  //   AttributeServices.getAllAttributes({
  //     type: "attribute",
  //     option: "Dropdown",
  //     option1: "Radio",
  //   })
  // );

  // const [data, setData] = useState([
  //   {
  //     _id: '3923fsd',
  //     title: 'Atribute 1',
  //     name: 'Atribute',
  //     option: 'option 1'

  //   }, {
  //     _id: '39ingtr',
  //     title: 'Atribute 2',
  //     name: 'Atribute',
  //     option: 'option 2'

  //   },
  //   {
  //     _id: '3345dkll',
  //     title: 'Atribute 3',
  //     name: 'Atribute',
  //     option: 'option 3'

  //   }, {
  //     _id: '32fdjk',
  //     title: 'Atribute 4',
  //     name: 'Atribute',
  //     option: 'option 4'

  //   }
  // ]);


  // const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();
  // // Inside Attributes component

  // // Function to handle deletion of selected attributes
  // const handleDeleteSelectedAttributes = () => {
  //   try {
  //     // Filter out the attributes that are not selected
  //     const updatedData = data.filter((attribute) => !isCheck.includes(attribute._id));
  //     // Update the data with the filtered attributes
  //     setData(updatedData);
  //     // Clear the selection
  //     setIsCheck([]);
  //     // Show a success message or trigger any necessary UI updates
  //     console.log("Selected attributes deleted successfully");
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error deleting selected attributes:", error);
  //     // Show an error message or trigger any necessary UI updates
  //   }
  // };
  const { allId, handleUpdateMany, handleDeleteMany } = useToggleDrawer();


  const { t } = useTranslation();

  const {
    filename,
    isDisabled,
    dataTable,
    serviceData,
    totalResults,
    attributeRef,
    resultsPerPage,
    handleSelectFile,
    handleChangePage,
    handleSubmitAttribute,
    handleUploadMultiple,
    handleRemoveSelectFile,
    handleDelete,
  } = useFilter(data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((value) => value._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
    // console.log("isCheck after setting:", isCheck);
  };

  const [attributes, setAttributes] = useState([]);
  // console.log("allID : ", allId)
  // console.log("attributes : ", attributes);
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        console.log("Attributes languages...");
        const response = await requests.get('/api/attributes');
        console.log("Attributes fetched successfully:", response);
        setAttributes(response);
      } catch (error) {
        console.error('Error fetching Attributes:', error);
      }
    };
    fetchLanguages();
  }, []);
  // console.log("datas : ", data)
  return (
    <>
      <PageTitle>{t("AttributeTitle")}</PageTitle>
      <DeleteModal ids={allId} handleDeleteMany={handleDeleteMany} setIsCheck={setIsCheck} title="Selected Attributes" />
      <BulkActionDrawer ids={allId} title="Attributes" />
      <MainDrawer>
        <AttributeDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitAttribute} className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
            <div className="flex justify-start xl:w-1/2  md:w-full">
              <UploadManyTwo
                title="Attribute"
                exportData={data}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>

            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 btn-gray text-gray-600"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>

                  {t("BulkAction")}
                </Button>
              </div>
              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={handleDeleteMany}
                  className="w-full rounded-md h-12 bg-red-500 btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>
                  {t("Delete")}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">

                {/* works heree  */}
                {/* <button onClick={handleSelectAll}>hi</button> */}
                {/* works heree  */}
                <Button onClick={toggleDrawer} className="w-full rounded-md h-12 ">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("CouponsAddAttributeBtn")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitAttribute}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={attributeRef}
                type="search"
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                placeholder={t("SearchAttributePlaceholder")}
              />
            </div>
          </form>
        </CardBody>
      </Card>

      {false
        // loading 
        ? (
          <TableLoading row={12} col={6} width={180} height={20} />
        ) :
        // serviceData?.length !== 0 
        true
          ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>
                      {/* <button onClick={handleSelectAll}>{'.'}</button> */}

                      {/* Added div for now to see if its working checkbox is nnot working properly */}

                      {/* <div
                        // type="checkbox"
                        // name="selectAll"
                        // id="selectAll"
                        //handleClick={handleSelectAll}
                        onClick={handleSelectAll}
                      // isChecked={isCheckAll}
                      > */}
                      <CheckBox type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        handleClick={handleSelectAll}
                        // onClick={handleSelectAll}
                        isChecked={isCheckAll} />
                      {/* </div> */}
                    </TableCell>
                    <TableCell> {t("Id")} </TableCell>
                    {/* <TableCell> {t("title")} </TableCell> */}
                    <TableCell> {t("AName")}</TableCell>
                    <TableCell> {t("ADisplayName")}</TableCell>
                    <TableCell>{t("AOption")}</TableCell>

                    <TableCell className="text-center">{t("catPublishedTbl")}</TableCell>
                    {/* just for now commented for the backends datas */}
                    {/* <TableCell className="text-center">{t("Avalues")}</TableCell> */}

                    <TableCell className="text-right">{t("AAction")}</TableCell>
                  </tr>
                </TableHeader>

                <AttributeTable
                  lang={lang}
                  isCheck={isCheck}
                  setIsCheck={setIsCheck}
                  // now this reflects in the search
                  attributes={dataTable}
                // attributes={data}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={handleChangePage}
                  label="Table navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Sorry, There are no attributes right now." />
          )}
    </>
  );
};

export default Attributes;
