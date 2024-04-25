import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";

//internal import
import useToggleDrawer from "hooks/useToggleDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import MainDrawer from "components/drawer/MainDrawer";
import LanguageDrawer from "components/drawer/LanguageDrawer";
import DeleteModal from "components/modal/DeleteModal";
import axios from "axios";
import requests from "services/httpService";

const LanguageTable = ({ languages, isCheck, setIsCheck }) => {
  const { serviceId, handleModalOpen, handleUpdate, title } = useToggleDrawer();
  // const [token, setToken] = useState('');
  // console.log("language", languages);
  const handleClick = (e) => {
    const { id, checked } = e.target;
    // console.log('click all id', id, checked);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching languages... Table");
  //       const response = await requests.get('/api/language/show');
  //       console.log("Languages fetched successfully from table:", response);
  //     } catch (error) {
  //       console.error('Error fetching languages:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);



  // Withh Tokens
  // const fetchData = async () => {
  //   try {
  //     console.log("Fetching languages... Table");
  //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBiOTAwYjE5ODg3ZmY1M2ZiODhmZGQiLCJpYXQiOjE3MTIyOTgwMjYsImV4cCI6MTcxMjMzMDQyNn0.ABoqL6yEjaLiHLa9DAafJKgdkf0rnTEwwCwvBCIcr-c'; // Replace with your actual authentication token
  //     const response = await axios.get('http://localhost:4000/languages', {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log("Languages fetched successfully from table:", response.data);
  //     // Handle the fetched languages data here if needed
  //   } catch (error) {
  //     console.error('Error fetching languages:', error);
  //   }
  // };

  // // Call fetchData function when the component mounts
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        <LanguageDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {languages?.map((language, i) => (
          <TableRow key={language._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={language.name}
                id={language._id}
                handleClick={handleClick}
                isChecked={isCheck.includes(language._id)}
              />
            </TableCell>
            <TableCell>
              <span className="font-semibold uppercase text-xs"> {i + 1}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{language.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm">{language.iso_code}</span>{" "}
              {/* <span className="text-sm">{language.code}</span>{" "} */}
            </TableCell>

            <TableCell>
              {/* <div
                className={`text-sm flag {language.flag}`}
              >{language.flag}</div>{" "} */}
              <div
                className={`text-sm flag ${language?.flag?.toLowerCase()}`}
              ></div>{" "}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={language._id} status={language.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={language._id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default LanguageTable;
