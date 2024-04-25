import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import useToggleDrawer from "hooks/useToggleDrawer";
// import StaffDrawer from "components/drawer/StaffDrawer";
// import DeleteModal from "components/modal/DeleteModal";
import ActiveInActiveButton from "components/table/ActiveInActiveButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import Status from "components/table/Status";
import MainDrawer from "components/drawer/MainDrawer";
import { showingTranslateValue } from "utils/translate";
import StaffDrawer from "components/drawer/StaffDrawer";
import DeleteModal from "components/modal/DeleteModal";
import requests from "services/httpService";
import CouponServices from "services/CouponServices";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import dayjs from "dayjs";
import AdminServices from "services/AdminServices";

const StaffTable = ({ staffs, lang }) => {
  const {
    // title,
    // serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
    serviceId,
    title,
  } = useToggleDrawer();
  const { data, loading } = useAsync(AdminServices.getAllStaff);

  const [coupons, setCoupons] = useState([]);
  // console.log("allID : ", allId)
  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       console.log("Fetching Coupons...");
  //       const response = await requests.get('/api/admin');
  //       console.log("Coupons fetched successfully:", response);
  //       setCoupons(response);
  //     } catch (error) {
  //       console.error('Error fetching languages:', error);
  //     }
  //   };
  //   fetchLanguages();
  // }, []);
  const { globalSetting } = useFilter();
  console.log("id: in stafftable ", data)
  return (
    <>
      <DeleteModal id={serviceId} title={title} />
      {/* Added By: Govinda 25/3/20 24 */}
      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {staffs?.map((staff) => (
          <TableRow key={staff._id}>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image}
                  alt="staff"
                />
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(staff?.name.en, lang)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.phone}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(staff.joiningData).format("DD/MM/YYYY")}  */}
                {showDateFormat(
                  staff.joiningData,
                  globalSetting.default_date_format
                )}
                {/* {staff.joiningDate} */}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{staff?.role}</span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <TableCell className="text-center">
                <ActiveInActiveButton
                  id={staff?._id}
                  staff={staff}
                  option="staff"
                  status={staff.status}
                />
              </TableCell>
              <Status status={staff.status} />
            </TableCell>

            {/* <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?._id}
                staff={staff}
                option="staff"
                status={staff.status}
              />
            </TableCell> */}

            <TableCell>
              <EditDeleteButton
                id={staff._id}
                staff={staff}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                // title={staff.name}
                title={showingTranslateValue(staff?.name.en, lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
