import React, { useEffect, useState } from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import Status from "components/table/Status";
import SelectStatus from "components/form/SelectStatus";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import CustomerServices from "services/CustomerServices";
import useAsync from "hooks/useAsync";
import requests from "services/httpService";
import dayjs from "dayjs";
import { or } from "ajv/dist/compile/codegen";

// import Status from '../table/Status';
// import SelectStatus from '../form/SelectStatus';

const CustomerOrderTable = ({ orders }) => {
  const [categories, setCategories] = useState([]);
  const { data, loading } = useAsync(CustomerServices.getAllCustomers);
  const { globalSetting } = useFilter(data);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       console.log("Fetching customerorders...");
  //       const response = await requests.get('/api/customer');
  //       console.log("customerOrders fetched successfully:", response);
  //       setCategories(response);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  // console.log("orders :", orders)

  // orders?.map((order) => { console.log("orders", order.) })
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?._id?.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.createdAt).format("MMM D, YYYY")}
                {/* commeneted just for now change when needed  */}
                {showDateFormat(
                  order.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{order?.user_info?.address}</span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">{order.user_info?.contact}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {order.paymentMethod}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                ${parseFloat(order.total).toFixed(2)}
              </span>{" "}
            </TableCell>
            <TableCell className="text-center">
              <Status status={order.status} />
            </TableCell>
            {/* added by : Govinda 19/04/2024 order was missing
            <TableCell className="text-right">
              <SelectStatus id={order._id} order={order} />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerOrderTable;
