// import { Select } from "@windmill/react-ui";
// import React from "react";
// import { useTranslation } from "react-i18next";

// //internal import

// // import useAsync from "hooks/useAsync";
// // import CategoryServices from "services/CategoryServices";
// import { showingTranslateValue } from "utils/translate";
// import categoryData from "utils/categories";

// const SelectCategory = ({ setCategory, lang }) => {
//   // const { data } = useAsync(CategoryServices.getAllCategories);
//   const data = categoryData;
//   // console.log('data category', data)
//   const { t } = useTranslation();

//   const handleChange = (e) => {
//     const selectedIndex = e.target.selectedIndex;
//     const selectedOption = e.target[selectedIndex];
//     //console.log("Selected category value:", selectedOption.value);
//     // console.log("Selected category text:", selectedOption.text);
//     setCategory(selectedOption.value);
//   };
//   return (
//     <>
//       <Select
//         onChange={handleChange}
//         className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
//       >
//         <option value="All" defaultValue hidden>
//           {t("Category")}
//         </option>
//         {data?.map((data) => {
//           // console.log('Parent data:', data.parent);
//           return (
//             <option key={data._id} value={data._id}>
//               {showingTranslateValue(data.parent, lang)}
//             </option>
//           );
//         })}

//       </Select>
//     </>
//   );
// };

// export default SelectCategory;


import { Select } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//internal import

import useAsync from "hooks/useAsync";
import CategoryServices from "services/CategoryServices";
import { showingTranslateValue, showingTranslateValue1 } from "utils/translate";
import requests from "services/httpService";
// import categoryData from "utils/categories";

const SelectCategory = ({ setCategory, lang }) => {
  const { data } = useAsync(CategoryServices.getAllCategory);
  // const data = categoryData;
  // console.log('data category', data)
  // data.forEach(element => {
  //   console.log('data category', element.parent)
  // });
  const { t } = useTranslation();

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       console.log("Fetching categories...");
  //       const response = await requests.get('/api/category/all');
  //       // console.log("Categories fetched successfully:", response);
  //       setCategories(response);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();

  //   // // Polling mechanism
  //   // const intervalId = setInterval(fetchCategories, 1000); // Fetch every 5 seconds

  //   // // Clear interval on unmount
  //   // return () => clearInterval(intervalId);
  // }, []);
  return (
    <>
      <Select
        onChange={(e) => setCategory(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
      >
        <option value="All" defaultValue hidden>
          {t("Category")}
        </option>
        {/* {data?.map((cat) => ( */}
        {data?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {showingTranslateValue(cat?.parent, lang)}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCategory;
