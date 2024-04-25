// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// // import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// import MainDrawer from "components/drawer/MainDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import ShowHideButton from "components/table/ShowHideButton";
// import useAsync from "hooks/useAsync";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import CurrencyServices from "services/CurrencyServices";
// import requests from "services/httpService";

// //internal import

// // import { SidebarContext } from '../context/SidebarContext';

// const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
//   const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   console.log('currency', currency)
//   const { data, loading } = useAsync(CurrencyServices.getAllCurrency);

//   const handleClick = (e) => {
//     const { id, checked } = e.target;

//     setIsCheck([...isCheck, id]);
//     if (!checked) {
//       setIsCheck(isCheck.filter((item) => item !== id));
//     }
//   };
//   // const [coupons, setCoupons] = useState([]);
//   // // console.log("allID : ", allId)
//   // useEffect(() => {
//   //   const fetchLanguages = async () => {
//   //     try {
//   //       console.log("Fetching currencies...");
//   //       const response = await requests.get('/api/currency');
//   //       console.log("currencies fetched successfully from  the tables:", response);
//   //       setCoupons(response);
//   //     } catch (error) {
//   //       console.error('Error fetching languages:', error);
//   //     }
//   //   };
//   //   fetchLanguages();
//   // }, []);
//   return (
//     <>
//       {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
//       {/* Added By: Govinda 25/3/2024 */}
//       <MainDrawer>
//         <CurrencyDrawer id={serviceId} />
//       </MainDrawer>

//       <TableBody>
//         {currency?.map((currency, i) => (
//           <TableRow key={i + 1}>
//             <TableCell>
//               <CheckBox
//                 type="checkbox"
//                 name={currency.symbol}
//                 //Added by : Govinda 9/4/2024 again added ._id
//                 id={currency._id}
//                 handleClick={handleClick}
//                 isChecked={isCheck.includes(currency._id)}
//               />
//             </TableCell>

//             <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.name}</span>
//             </TableCell>

//             {/* <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.iso_code}</span>
//             </TableCell> */}

//             <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.symbol}</span>
//             </TableCell>

//             <TableCell className="text-center">
//               <ShowHideButton
//                 // id={currency.cc}
//                 // status={currency.cc}

//                 // addedd by : Govinda 9/4/2024 just replaced the .id and .status
//                 id={currency._id}
//                 status={currency.status}
//                 currencyStatusName="status"
//               />
//             </TableCell>

//             <TableCell>
//               <EditDeleteButton
//                 title={currency.name}
//                 id={currency._id}
//                 handleUpdate={handleUpdate}
//                 handleModalOpen={handleModalOpen}
//               />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </>
//   );
// };

// export default CurrencyTable;


// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// import MainDrawer from "components/drawer/MainDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import ShowHideButton from "components/table/ShowHideButton";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import CurrencyServices from "services/CurrencyServices";

// const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
//   const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   const [updatedCurrency, setUpdatedCurrency] = useState(currency);
//   useEffect(() => {
//     setUpdatedCurrency(currency);
//   }, [currency]);
//   console.log("currencies : ", currency)
//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.index === destination.index) return;

//     const updatedCurrencyCopy = [...updatedCurrency];
//     const [draggedItem] = updatedCurrencyCopy.splice(source.index, 1);
//     updatedCurrencyCopy.splice(destination.index, 0, draggedItem);

//     updatedCurrencyCopy.forEach((item, index) => {
//       item.priority = index + 1;
//     });

//     setUpdatedCurrency(updatedCurrencyCopy);
//   };

//   const handleClick = (e) => {
//     const { id, checked } = e.target;

//     setIsCheck((prevIsCheck) => {
//       if (checked) {
//         return [...prevIsCheck, id];
//       } else {
//         return prevIsCheck.filter((item) => item !== id);
//       }
//     });
//   };

//   return (
//     <>
//       {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
//       <MainDrawer>
//         <CurrencyDrawer id={serviceId} />
//       </MainDrawer>

//       <TableBody>
//         {/* <div style={{ width: "100%" }}> */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="currencyTable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {updatedCurrency.map((currency, index) => (
//                   <Draggable key={currency._id} draggableId={currency._id} index={index}>
//                     {(provided, snapshot) => (
//                       <TableRow
//                         key={index + 1}
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={{
//                           ...provided.draggableProps.style,
//                           backgroundColor: snapshot.isDragging ? "#f0f0f0" : "white",
//                           cursor: "pointer",
//                           width: "100%",
//                         }}
//                       >
//                         <TableCell className="text-center">
//                           <div {...provided.dragHandleProps}>
//                             <CheckBox
//                               type="checkbox"
//                               name={currency.symbol}
//                               id={currency._id}
//                               handleClick={handleClick}
//                               isChecked={isCheck.includes(currency._id)}
//                             />
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.name}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.symbol}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <ShowHideButton
//                             id={currency._id}
//                             status={currency.status}
//                             currencyStatusName="status"
//                           />
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <EditDeleteButton
//                             title={currency.name}
//                             id={currency._id}
//                             handleUpdate={handleUpdate}
//                             handleModalOpen={handleModalOpen}
//                           />
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//         {/* </div> */}
//       </TableBody>
//     </>
//   );
// };

// export default CurrencyTable;

// // export default CurrencyTable;


// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// import MainDrawer from "components/drawer/MainDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import ShowHideButton from "components/table/ShowHideButton";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import CurrencyServices from "services/CurrencyServices";

// const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
//   const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   const [updatedCurrency, setUpdatedCurrency] = useState([]);

//   useEffect(() => {
//     // Sort the currency array based on priority received from the backend
//     const sortedCurrency = currency.sort((a, b) => a.priority - b.priority);
//     setUpdatedCurrency(sortedCurrency);
//   }, [currency]);

//   // const onDragEnd = (result) => {
//   //   if (!result.destination) return;
//   //   const { source, destination } = result;

//   //   if (source.index === destination.index) return;

//   //   const updatedCurrencyCopy = [...updatedCurrency];
//   //   const [draggedItem] = updatedCurrencyCopy.splice(source.index, 1);
//   //   updatedCurrencyCopy.splice(destination.index, 0, draggedItem);

//   //   updatedCurrencyCopy.forEach((item, index) => {
//   //     item.priority = index + 1;
//   //   });

//   //   setUpdatedCurrency(updatedCurrencyCopy);
//   // };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.index === destination.index) return;

//     const updatedCurrencyCopy = [...updatedCurrency];
//     const [draggedItem] = updatedCurrencyCopy.splice(source.index, 1);
//     updatedCurrencyCopy.splice(destination.index, 0, draggedItem);

//     // Update the state with the reordered currency list
//     setUpdatedCurrency(updatedCurrencyCopy);

//     // Update the backend with the new priorities
//     const updatedPriorities = updatedCurrencyCopy.map((item, index) => ({
//       _id: item._id,
//       priority: index + 1,
//     }));

//     // Send a request to update the priorities in the backend
//     // CurrencyServices.updatePriorities(updatedPriorities)
//     //   .then((response) => {
//     //     // Handle success response if needed
//     //   })
//     //   .catch((error) => {
//     //     // Handle error if needed
//     //   });
//     CurrencyServices.updatePriorities(updatedPriorities)
//       .then((response) => {
//         // Handle success response
//         console.log("Priorities updated successfully:", response);
//         // Optionally, update any UI to reflect the changes
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error updating priorities:", error);
//         // Optionally, show an error message to the user
//       });

//   };

//   // Rest of the component code remains the same


//   const handleClick = (e) => {
//     const { id, checked } = e.target;

//     setIsCheck((prevIsCheck) => {
//       if (checked) {
//         return [...prevIsCheck, id];
//       } else {
//         return prevIsCheck.filter((item) => item !== id);
//       }
//     });
//   };

//   return (
//     <>
//       {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
//       <MainDrawer>
//         <CurrencyDrawer id={serviceId} />
//       </MainDrawer>

//       <TableBody>
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="currencyTable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}
//               >
//                 {updatedCurrency.map((currency, index) => (
//                   <Draggable key={currency._id} draggableId={currency._id} index={index}>
//                     {(provided, snapshot) => (
//                       <TableRow
//                         key={index + 1}
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={{
//                           ...provided.draggableProps.style,
//                           backgroundColor: snapshot.isDragging ? "#f0f0f0" : "white",
//                           cursor: "pointer",
//                           width: "100%",
//                         }}
//                       >
//                         <TableCell className="text-center">
//                           <div {...provided.dragHandleProps}>
//                             <CheckBox
//                               type="checkbox"
//                               name={currency.symbol}
//                               id={currency._id}
//                               handleClick={handleClick}
//                               isChecked={isCheck.includes(currency._id)}
//                             />
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.name}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.symbol}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <ShowHideButton
//                             id={currency._id}
//                             status={currency.status}
//                             currencyStatusName="status"
//                           />
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <EditDeleteButton
//                             title={currency.name}
//                             id={currency._id}
//                             handleUpdate={handleUpdate}
//                             handleModalOpen={handleModalOpen}
//                           />
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </TableBody>
//     </>
//   );
// };

// export default CurrencyTable;






// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// // import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// import MainDrawer from "components/drawer/MainDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import ShowHideButton from "components/table/ShowHideButton";
// import useAsync from "hooks/useAsync";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import CurrencyServices from "services/CurrencyServices";
// import requests from "services/httpService";

// //internal import

// // import { SidebarContext } from '../context/SidebarContext';

// const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
//   const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   console.log('currency', currency)
//   const { data, loading } = useAsync(CurrencyServices.getAllCurrency);

//   const handleClick = (e) => {
//     const { id, checked } = e.target;

//     setIsCheck([...isCheck, id]);
//     if (!checked) {
//       setIsCheck(isCheck.filter((item) => item !== id));
//     }
//   };
//   // const [coupons, setCoupons] = useState([]);
//   // // console.log("allID : ", allId)
//   // useEffect(() => {
//   //   const fetchLanguages = async () => {
//   //     try {
//   //       console.log("Fetching currencies...");
//   //       const response = await requests.get('/api/currency');
//   //       console.log("currencies fetched successfully from  the tables:", response);
//   //       setCoupons(response);
//   //     } catch (error) {
//   //       console.error('Error fetching languages:', error);
//   //     }
//   //   };
//   //   fetchLanguages();
//   // }, []);
//   return (
//     <>
//       {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
//       {/* Added By: Govinda 25/3/2024 */}
//       <MainDrawer>
//         <CurrencyDrawer id={serviceId} />
//       </MainDrawer>

//       <TableBody>
//         {currency?.map((currency, i) => (
//           <TableRow key={i + 1}>
//             <TableCell>
//               <CheckBox
//                 type="checkbox"
//                 name={currency.symbol}
//                 //Added by : Govinda 9/4/2024 again added ._id
//                 id={currency._id}
//                 handleClick={handleClick}
//                 isChecked={isCheck.includes(currency._id)}
//               />
//             </TableCell>

//             <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.name}</span>
//             </TableCell>

//             {/* <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.iso_code}</span>
//             </TableCell> */}

//             <TableCell className="text-center">
//               <span className="font-medium text-sm">{currency.symbol}</span>
//             </TableCell>

//             <TableCell className="text-center">
//               <ShowHideButton
//                 // id={currency.cc}
//                 // status={currency.cc}

//                 // addedd by : Govinda 9/4/2024 just replaced the .id and .status
//                 id={currency._id}
//                 status={currency.status}
//                 currencyStatusName="status"
//               />
//             </TableCell>

//             <TableCell>
//               <EditDeleteButton
//                 title={currency.name}
//                 id={currency._id}
//                 handleUpdate={handleUpdate}
//                 handleModalOpen={handleModalOpen}
//               />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </>
//   );
// };

// export default CurrencyTable;


// import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
// import CurrencyDrawer from "components/drawer/CurrencyDrawer";
// import MainDrawer from "components/drawer/MainDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import ShowHideButton from "components/table/ShowHideButton";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import CurrencyServices from "services/CurrencyServices";

// const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
//   const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   const [updatedCurrency, setUpdatedCurrency] = useState(currency);
//   useEffect(() => {
//     setUpdatedCurrency(currency);
//   }, [currency]);
//   console.log("currencies : ", currency)
//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.index === destination.index) return;

//     const updatedCurrencyCopy = [...updatedCurrency];
//     const [draggedItem] = updatedCurrencyCopy.splice(source.index, 1);
//     updatedCurrencyCopy.splice(destination.index, 0, draggedItem);

//     updatedCurrencyCopy.forEach((item, index) => {
//       item.priority = index + 1;
//     });

//     setUpdatedCurrency(updatedCurrencyCopy);
//   };

//   const handleClick = (e) => {
//     const { id, checked } = e.target;

//     setIsCheck((prevIsCheck) => {
//       if (checked) {
//         return [...prevIsCheck, id];
//       } else {
//         return prevIsCheck.filter((item) => item !== id);
//       }
//     });
//   };

//   return (
//     <>
//       {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
//       <MainDrawer>
//         <CurrencyDrawer id={serviceId} />
//       </MainDrawer>

//       <TableBody>
//         {/* <div style={{ width: "100%" }}> */}
//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="currencyTable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {updatedCurrency.map((currency, index) => (
//                   <Draggable key={currency._id} draggableId={currency._id} index={index}>
//                     {(provided, snapshot) => (
//                       <TableRow
//                         key={index + 1}
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={{
//                           ...provided.draggableProps.style,
//                           backgroundColor: snapshot.isDragging ? "#f0f0f0" : "white",
//                           cursor: "pointer",
//                           width: "100%",
//                         }}
//                       >
//                         <TableCell className="text-center">
//                           <div {...provided.dragHandleProps}>
//                             <CheckBox
//                               type="checkbox"
//                               name={currency.symbol}
//                               id={currency._id}
//                               handleClick={handleClick}
//                               isChecked={isCheck.includes(currency._id)}
//                             />
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.name}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <span className="font-medium">{currency.symbol}</span>
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <ShowHideButton
//                             id={currency._id}
//                             status={currency.status}
//                             currencyStatusName="status"
//                           />
//                         </TableCell>
//                         <TableCell className="text-center">
//                           <EditDeleteButton
//                             title={currency.name}
//                             id={currency._id}
//                             handleUpdate={handleUpdate}
//                             handleModalOpen={handleModalOpen}
//                           />
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//         {/* </div> */}
//       </TableBody>
//     </>
//   );
// };

// export default CurrencyTable;

// // export default CurrencyTable;



import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import CurrencyDrawer from "components/drawer/CurrencyDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CurrencyServices from "services/CurrencyServices";

const CurrencyTable = ({ currency, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [updatedCurrency, setUpdatedCurrency] = useState([]);

  useEffect(() => {
    const sortedCurrency = currency.sort((a, b) => a.priority - b.priority);
    setUpdatedCurrency(sortedCurrency);
  }, [currency]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.index === destination.index) return;

    const updatedCurrencyCopy = [...updatedCurrency];
    const [draggedItem] = updatedCurrencyCopy.splice(source.index, 1);
    updatedCurrencyCopy.splice(destination.index, 0, draggedItem);

    setUpdatedCurrency(updatedCurrencyCopy);

    const updatedPriorities = updatedCurrencyCopy.map((item, index) => ({
      _id: item._id,
      priority: index + 1,
    }));

    CurrencyServices.updatePriorities(updatedPriorities)
      .then((response) => {
        console.log("Priorities updated successfully:", response);
      })
      .catch((error) => {
        console.error("Error updating priorities:", error);
      });
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck((prevIsCheck) => {
      if (checked) {
        return [...prevIsCheck, id];
      } else {
        return prevIsCheck.filter((item) => item !== id);
      }
    });
  };

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
      <MainDrawer>
        <CurrencyDrawer id={serviceId} />
      </MainDrawer>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="currencyTable">
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {updatedCurrency.map((currency, index) => (
                <Draggable key={currency._id} draggableId={currency._id} index={index}>
                  {(provided, snapshot) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? "#f0f0f0" : "white",
                        // cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      <TableCell>
                        <div {...provided.dragHandleProps}>
                          <CheckBox
                            type="checkbox"
                            name={currency.symbol}
                            id={currency._id}
                            handleClick={handleClick}
                            isChecked={isCheck.includes(currency._id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{currency.name}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{currency.symbol}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <ShowHideButton
                          id={currency._id}
                          status={currency.status}
                          currencyStatusName="status"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <EditDeleteButton
                          title={currency.name}
                          id={currency._id}
                          handleUpdate={handleUpdate}
                          handleModalOpen={handleModalOpen}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default CurrencyTable;
