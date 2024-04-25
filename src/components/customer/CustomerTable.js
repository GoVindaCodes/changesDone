import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import CustomerDrawer from "components/drawer/CustomerDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import Tooltip from "components/tooltip/Tooltip";
import * as dayjs from "dayjs";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FiMail, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import CustomerServices from "services/CustomerServices";
import requests from "services/httpService";
import ComposeEmail from "./ComposeEmail";
// internal imports

const CustomerTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [customer, setCustomer] = useState([]);
  const { data, loading } = useAsync(CustomerServices.getAllCustomers);
  const [isComposeEmailOpen, setIsComposeEmailOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState("");

  const handleOpenComposeEmail = (email) => {
    console.log("Opening ComposeEmail component...");
    setRecipientEmail(email);
    setIsComposeEmailOpen(true);
  };

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       console.log("Fetching categories...");
  //       const response = await requests.get('/api/customer');
  //       console.log("Categories fetched successfully:", response);
  //       setCustomer(response);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {/* {" "}*/}
                {user?._id?.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.phone}</span>
            </TableCell>

            <TableCell>
              <TableCell>
                <Link to={`/compose-email/${user._id}`} onClick={() => handleOpenComposeEmail(user.email)}>
                  <Tooltip
                    id="mail"
                    Icon={FiMail}
                    title="Mail"
                    bgColor="#34D399"
                  />
                </Link>
              </TableCell>
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {isComposeEmailOpen && (
                  <ComposeEmail
                    recipientEmail={user.email}
                    onClose={() => setIsComposeEmailOpen(false)}
                  />
                )}
              </div>
              {/* <Link to={`/compose-email/${user._id}`} onClick={() => handleOpenComposeEmail(user.email)}>
                  <Tooltip
                    id="mail"
                    Icon={FiMail}
                    title="Mail"
                    bgColor="#34D399"
                  />
                </Link>
              </TableCell>
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {isComposeEmailOpen && (
                  <ComposeEmail
                    recipientEmail={user.email}
                    onClose={() => setIsComposeEmailOpen(false)}
                  />
                )}
              </div> */}
              {/* 
                <div
                  className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
                  onClick={handleOpenComposeEmail}
                >
                  <Tooltip
                    id="mail"
                    Icon={FiMail}
                    title="Mail"
                    bgColor="#34D399"
                  />
                </div>
              </TableCell>
              {isComposeEmailOpen && (
                <ComposeEmail
                  recipientEmail={user.email}
                  onClose={() => setIsComposeEmailOpen(false)}
                />
              )} */}
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <Link to={`/customer-order/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={user.name}
                  id={user._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
