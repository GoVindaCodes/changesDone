import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

//internal import

// import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import MainDrawer from "components/drawer/MainDrawer";
// import StaffDrawer from "components/drawer/StaffDrawer";
import TableLoading from "components/preloader/TableLoading";
import StaffTable from "components/staff/StaffTable";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
// import { AdminContext } from "context/AdminContext";
import { SidebarContext } from "context/SidebarContext";
import adminData from "utils/staff";
import useAsync from "hooks/useAsync";
import AdminServices from "services/AdminServices";
import requests from "services/httpService";
import StaffDrawer from "components/drawer/StaffDrawer";
// import AdminServices from "services/AdminServices";

const Staff = () => {
  // const { state } = useContext(AdminContext);
  // const { adminInfo } = state;
  const { toggleDrawer, lang } = useContext(SidebarContext);

  // const { data, loading } = useAsync(() => AdminServices.getAllStaff({ email: ('adminInfo.email') }));
  const { data, loading } = useAsync(AdminServices.getAllStaff);
  // const data = adminData;
  // const loading = false

  const {
    userRef,
    setRole,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitUser,
  } = useFilter(data);


  const { t } = useTranslation();
  // const [coupons, setCoupons] = useState([]);
  // // console.log("allID : ", allId)
  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       console.log("Fetching Coupons...");
  //       const response = await requests.get('/api/admin');
  //       console.log("admin fetched successfully:", response);
  //       setCoupons(response);
  //     } catch (error) {
  //       console.error('Error fetching languages:', error);
  //     }
  //   };
  //   fetchLanguages();
  // }, []);

  return (
    <>
      <PageTitle>{t("StaffPageTitle")} </PageTitle>
      <MainDrawer>
        <StaffDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("StaffSearchBy")}
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setRole(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue >
                  {t("StaffRole")}
                </option>
                <option value="Admin">{t("StaffRoleAdmin")}</option>
                {/* <option value="Cashier">{t("SelectCashiers")}</option> */}
                {/* <option value="Super Admin">{t("SelectSuperAdmin")}</option> */}
                {/* Added BY : Govinda on 22/04/2024 */}
                <option value="CEO">{t("CEO")}</option>
                <option value="Manager">{t("Manager")}</option>
                <option value="Accountant">{t("Accountant")}</option>
                <option value="Driver">{t("Driver")}</option>
                <option value="Security Guard">{t("Security Guard")}</option>
              </Select>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                {t("AddStaff")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={7} width={163} height={20} />
      ) :
        //  true
        serviceData?.length !== 0
          ? (
            <TableContainer className="mb-8 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("StaffNameTbl")}</TableCell>
                    <TableCell>{t("StaffEmailTbl")}</TableCell>
                    <TableCell>{t("StaffContactTbl")}</TableCell>
                    <TableCell>{t("StaffJoiningDateTbl")}</TableCell>
                    <TableCell>{t("StaffRoleTbl")}</TableCell>
                    <TableCell className="text-center">{t("OderStatusTbl")}</TableCell>
                    {/* <TableCell className="text-center">{t("PublishedTbl")}</TableCell> */}

                    <TableCell className="text-right">{t("StaffActionsTbl")}</TableCell>
                  </tr>
                </TableHeader>

                <StaffTable staffs={dataTable} lang={lang} />
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
            <NotFound title="Sorry, There are no staff right now." />
          )}
    </>
  );
};

export default Staff;
