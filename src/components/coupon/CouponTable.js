import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import * as dayjs from "dayjs";

//internal import

// import { useEffect } from "react";
import { useEffect, useState } from "react";
import useToggleDrawer from "hooks/useToggleDrawer";
// import useAsync from "hooks/useAsync";
// import SettingServices from "services/SettingServices";
// import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
// import CouponDrawer from "components/drawer/CouponDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import CouponDrawer from "components/drawer/CouponDrawer";
import DeleteModal from "components/modal/DeleteModal";
import useAsync from "hooks/useAsync";
import AttributeServices from "services/AttributeServices";
import requests from "services/httpService";
import CouponServices from "services/CouponServices";
import SettingServices from "services/SettingServices";
import { showingTranslateValue } from "utils/translate";
import { showDateFormat } from "utils/dateFormate";
// import { showingTranslateValue } from "utils/translate";
// import { showDateFormat } from "utils/dateFormate";

const CouponTable = ({ lang, isCheck, setIsCheck, coupons }) => {
  const { data, loading } = useAsync(CouponServices.getAllCoupons);

  // commeneted just for now here for you sir
  // const [updatedCoupons, setUpdatedCoupons] = useState(coupons);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer(data);
  // const { data, loading } = useAsync(CouponServices.getAllCoupons);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  // console.log("coupons sir :", coupons)
  // console.log("coupons sir 1 :", setUpdatedCoupons)
  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  // const [coupons, setCoupons] = useState([]);
  // // console.log("allID : ", allId)
  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       console.log("Fetching Coupons...");
  //       const response = await requests.get('/api/coupon');
  //       console.log("Coupons fetched successfully:", response);
  //       setCoupons(response);
  //     } catch (error) {
  //       console.error('Error fetching languages:', error);
  //     }
  //   };
  //   fetchLanguages();
  // }, []);
  // const currency = globalSetting?.default_currency || "$";

  // useEffect(() => {
  //   const result = coupons?.map((el) => {
  //     const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
  //       timeZone: globalSetting?.default_time_zone,
  //     });
  //     const newObj = {
  //       ...el,
  //       updatedDate: newDate,
  //     };
  //     return newObj;
  //   });
  //   setUpdatedCoupons(result);
  // }, [coupons, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        //Added By: Govinda 25/3/2024
        <MainDrawer>
          <CouponDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {coupons?.map((coupon, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={coupon?.title?.en}
                id={coupon._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(coupon._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {coupon?.logo ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={coupon?.logo}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <span className="text-sm">
                    {showingTranslateValue(coupon?.title.en, lang)}
                    {/* {coupon?.title[lang]} */}
                  </span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm"> {coupon.couponCode}</span>{" "}
            </TableCell>

            {
              true
                // coupon?.discountType?.type 
                ? (
                  <TableCell>
                    {" "}
                    <span className="text-sm font-semibold">
                      {" "}
                      {coupon?.discountType?.type === "percentage"
                        ? `${coupon?.discountType?.value}%`
                        // : `${'$'}${coupon?.discountPercentage}`}
                        // fixed for this backend schemas
                        : `${'$'}${coupon?.discountType?.value}`}
                    </span>{" "}
                  </TableCell>
                ) : (
                  <TableCell>
                    {" "}
                    <span className="text-sm font-semibold"> </span>{" "}
                  </TableCell>
                )}

            <TableCell className="text-center">
              <ShowHideButton id={coupon._id} status={coupon.status} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(coupon.startTime).format("MMM D, YYYY")} */}
                {/* {showDateFormat(
                  coupon.startTime,
                  globalSetting?.default_date_format
                )} */}
                {showDateFormat(
                  coupon.updatedAt,
                  globalSetting?.default_date_format
                )}
                {/* {coupon.createdAt} */}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(coupon.endTime).format("MMM D, YYYY")} */}
                {/* {showDateFormat(
                  coupon.endTime,
                  globalSetting?.default_date_format
                )} */}
                {showDateFormat(
                  coupon.updatedAt,
                  globalSetting?.default_date_format
                )}
                {/* {coupon.updatedAt} */}
              </span>
            </TableCell>

            <TableCell className="align-middle ">
              {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                <Badge type="danger">Expired</Badge>
              ) : (
                <Badge type="success">Active</Badge>
              )}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={coupon?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(coupon?.title[lang], lang)}
              // title={coupon.title}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CouponTable;
