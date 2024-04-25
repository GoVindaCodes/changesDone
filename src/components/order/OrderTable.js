import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import PrintReceipt from "components/form/PrintReceipt";
import SelectStatus from "components/form/SelectStatus";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import OrderServices from "services/OrderServices";
import requests from "services/httpService";
import { showDateTimeFormat } from "utils/dateFormate";
// import { showDateTimeFormat } from "utils/dateFormate";

const OrderTable = ({ orders, currency, globalSetting }) => {
  // console.log('globalSetting',globalSetting)
  const { data, loading } = useAsync(OrderServices.getAllOrders);

  const { t } = useTranslation();
  // console.log('orders:=>', orders)
  // console.log("data in orders page", data);
  // const [coupons, setCoupons] = useState([]);
  // // console.log("allID : ", allId)
  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       console.log("Fetching orders...");
  //       const response = await requests.get('/api/orders');
  //       console.log("orders fetched successfully:", response);
  //       setCoupons(response);
  //     } catch (error) {
  //       console.error('Error fetching languages:', error);
  //     }
  //   };
  //   fetchLanguages();
  // }, []);

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?.invoice}
                {order?._id.slice(0, 5)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateTimeFormat(
                  order?.updatedDate,
                  globalSetting?.default_date_format,
                  "h:mm A"
                )}
                {/* {order?.updatedDate} */}

              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">{order?.user_info?.name}</span>{" "}
              <span className="text-sm">{order?.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.paymentMethod}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {parseFloat(order?.total)?.toFixed(2)}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status || 'pending'} />
              {/* <Status status={"Pending"} /> */}

            </TableCell>

            <TableCell className="text-center">
              <SelectStatus id={order._id} order={order} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                <PrintReceipt orderId={order._id} />
                {/* <PrintReceipt orderId={1} /> */}

                <span className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  <Link to={`/order/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewInvoice")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
