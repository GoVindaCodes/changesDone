// import currencies from 'utils/currency';
// import requests from './httpService';

// const CurrencyServices = {
//   getAllCurrency: async () => {
//     return requests.get('/currency');
//   },

//   getShowingCurrency: async () => {
//     return requests.get('/currency/show');
//   },

//   getCurrencyById: async (id) => {
//     return requests.get(`/currency/${id}`);
//   },

//   addCurrency: async (body) => {
//     // return requests.post('/currency/add', body);
//     // addProduct: async (body) => {
//     try {
//       console.log("Adding currency:", body);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       currencies.push(body);
//       return { success: true, message: "currency added successfully" };
//     } catch (error) {
//       return { success: false, message: "Failed to add currency" };
//     }
//     // },
//   },

//   addAllCurrency: async (body) => {
//     return requests.post('/currency/add/all', body);
//   },

//   updateCurrency: async (id, body) => {
//     return requests.put(`/currency/${id}`, body);
//   },

//   updateManyCurrencies: async (body) => {
//     return requests.patch('currency/update/many', body);
//   },

//   updateEnabledStatus: async (id, body) => {
//     return requests.put(`/currency/status/enabled/${id}`, body);
//   },

//   updateLiveExchangeRateStatus: async (id, body) => {
//     return requests.put(`/currency/status/live-exchange-rates/${id}`, body);
//   },


//   deleteCurrency: async (index) => {
//     // return requests.delete(`/category/${id}`, body);
//     try {
//       console.log("Deleting currency at index:", index);
//       await new Promise(resolve => setTimeout(resolve, 1000))
//       currencies.splice(index, 1);
//       return { success: true, message: "Currency deleted successfully" };
//     } catch (error) {
//       return { success: false, message: "Failed to delete currency" };
//     }
//     // console.log("5", body)
//     // const { ids } = body;
//     // try {
//     //   await new Promise(resolve => setTimeout(resolve, 1000));
//     //   const updatedProducts = currencies.filter(product => !ids.includes(product._id));
//     //   currencies.length = 0;
//     //   updatedProducts.forEach(product => currencies.push(product));
//     //   return { success: true, message: "Products deleted successfully", data: updatedProducts };
//     // } catch (error) {
//     //   return { success: false, message: "Failed to delete products" };
//     // }
//   },


//   // deleteCurrency: async (index) => {

//   //   console.log("5", body)
//   //   const { ids } = body;
//   //   try {
//   //     await new Promise(resolve => setTimeout(resolve, 1000));
//   //     const updatedProducts = currencies.filter(product => !ids.includes(product._id));
//   //     currencies.length = 0;
//   //     updatedProducts.forEach(product => currencies.push(product));
//   //     return { success: true, message: "Products deleted successfully", data: updatedProducts };
//   //   } catch (error) {
//   //     return { success: false, message: "Failed to delete products" };
//   //   }
//   // },

//   deleteManyCurrency: async (body) => {
//     // return requests.patch('/currency/delete/many', body);
//     console.log("5", body);
//     const { ids, category } = body;
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const updatedCategories = currencies.filter(cat => !ids.includes(cat._id));
//       currencies.length = 0;
//       updatedCategories.forEach(cat => currencies.push(cat));
//       return { success: true, message: "Categories deleted successfully", data: updatedCategories };
//     } catch (error) {
//       return { success: false, message: "Failed to delete categories" };
//     }

//   },
// };

// export default CurrencyServices;


// for the backend for now addedd heree for you sir yow

import requests from "./httpService";

const CurrencyServices = {
  getAllCurrency: async () => {
    return requests.get('/api/currency');
  },

  updatePriorities: async (currencies) => {
    return requests.patch('/api/currency/update/priorities', currencies);
  },

  getShowingCurrency: async (data) => {
    // console.log("datas :", data)
    return requests.get('/api/currency/show');
  },

  getCurrencyById: async (id) => {
    return requests.get(`/api/currency/${id}`);
  },

  addCurrency: async (body) => {
    return requests.post('/api/currency/add', body);
  },

  addAllCurrency: async (body) => {
    return requests.post('/api/currency/add/all', body);
  },

  updateCurrency: async (id, body) => {
    return requests.put(`/api/currency/${id}`, body);
  },

  updateManyCurrencies: async (body) => {
    return requests.patch('/api/currency/update/many', body);
  },

  updateEnabledStatus: async (id, body) => {
    console.log("id : ", id)
    console.log("id : ", body)
    return requests.put(`/api/currency/status/enabled/${id}`, body);
  },

  updateLiveExchangeRateStatus: async (id, body) => {
    return requests.put(`/api/currency/status/live-exchange-rates/${id}`, body);
  },

  deleteCurrency: async (id) => {
    return requests.delete(`/api/currency/${id}`);
  },

  deleteManyCurrency: async (body) => {
    return requests.patch('/api/currency/delete/many', body);
  },
};

export default CurrencyServices;
