// import productData from "utils/products";
// import requests from "./httpService";

// const ProductServices = {
//   getAllProducts: async (
//     // {page, limit, category, title, price }
//   ) => {
//     // const searchCategory = category !== null ? category : "";
//     // const searchTitle = title !== null ? title : "";
//     // const searchPrice = price !== null ? price : "";

//     // return requests.get(
//     //   `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
//     // );
//     return (
//       { products: [{ _id: 1, title: { en: "Samsung" }, prices: { price: 120, discount: 10, originalPrice: 108 }, stock: 10, description: 'description', tag: 'none', category: { name: 'Phones' }, image: ['none'], status: 'none' }] }
//     );
//   },

//   getProductById: async (id) => {
//     // return requests.post(`/products/${id}`);  return (
//     // return ({ _id: 1, title: { en: "Samsung" }, prices: { price: 120, discount: 10, originalPrice: 108 }, stock: 10, description: 'description', tag: 'none', category: { name: 'Phones' }, image: ['none'], status: 'none' }
//     // );
//     try {
//       // Find the product with the specified ID in the productData array
//       const product = productData.find(product => product._id === id);
//       if (product) {
//         return { success: true, data: product };
//       } else {
//         return { success: false, message: "Product not found" };
//       }
//     } catch (error) {
//       return { success: false, message: "Failed to fetch product" };
//     }
//   },
//   // addProduct: async (body) => {
//   //   return requests.post("/products/add", body);
//   // },
//   addProduct: async (body) => {
//     try {
//       console.log("Adding product:", body);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       productData.push(body);
//       return { success: true, message: "Product added successfully" };
//     } catch (error) {
//       return { success: false, message: "Failed to add product" };
//     }
//   },

//   // deleteProduct: async (id) => {
//   //   try {
//   //     console.log("Deleting product with ID:", id);
//   //     await new Promise(resolve => setTimeout(resolve, 1000));
//   //     const updatedProducts = productData.filter(product => product._id !== id);
//   //     productData.length = 0;
//   //     updatedProducts.forEach(product => productData.push(product));
//   //     return { success: true, message: "Product deleted successfully" };
//   //   } catch (error) {
//   //     return { success: false, message: "Failed to delete product" };
//   //   }
//   // },
//   addAllProducts: async (body) => {
//     return requests.post("/products/all", body);
//   },
//   updateProduct: async (id, body) => {
//     return requests.patch(`/products/${id}`, body);
//   },
//   updateManyProducts: async (body) => {
//     return requests.patch("products/update/many", body);
//   },
//   updateStatus: async (id, body) => {
//     return requests.put(`/products/status/${id}`, body);
//   },

//   // for now commeneted uncomment for backend integration

//   // deleteProduct: async (id) => {
//   //   return requests.delete(`/products/${id}`);
//   // },

//   deleteProduct: async (id) => {
//     try {
//       console.log("Deleting product with ID:", id);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const updatedProducts = productData.filter(product => product._id !== id);
//       productData.length = 0;
//       updatedProducts.forEach(product => productData.push(product));
//       return { success: true, message: "Product deleted successfully" };
//     } catch (error) {
//       return { success: false, message: "Failed to delete product" };
//     }
//   },

//   // for now commeneted uncomment for backend integration

//   // deleteManyProducts: async (body) => {
//   //   return requests.patch("/products/delete/many", body);
//   // },
//   deleteManyProducts: async (body) => {
//     console.log("Request Body:", body);
//     const { ids } = body;
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       const updatedProducts = productData.filter(product => !ids.includes(product._id));
//       productData.length = 0;
//       updatedProducts.forEach(product => productData.push(product));
//       return { success: true, message: "Products deleted successfully", data: updatedProducts };
//     } catch (error) {
//       return { success: false, message: "Failed to delete products" };
//     }
//   }
// };

// export default ProductServices;




// new backendss addedds

import requests from './httpService';

const ProductServices = {
  getAllProducts: async () => {
    return requests.get("/api/products");
  },

  //  just added for slugss
  //  updated the routes as well heree for now
  getProductById: async (id) => {
    return requests.get(`/api/products/product/${id}`);
  },

  //  just added for slugss

  getProductBySlug: async (slug) => {
    return requests.get(`/api/products/product/${slug}`);
  },

  addProduct: async (body) => {
    return requests.post("/api/products/add", body);
  },

  addAllProducts: async (body) => {
    return requests.post("/api/products/all", body);
  },

  updateProduct: async (id, body) => {
    console.log("ids and bodyy : ", id, body)
    return requests.patch(`/api/products/${id}`, body);
  },

  updateManyProducts: async (body) => {
    return requests.patch("/api/products/update/many", body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/api/products/status/${id}`, body);
  },

  deleteProduct: async (id) => {
    return requests.delete(`/api/products/${id}`);
  },

  deleteManyProducts: async (body) => {
    return requests.patch("/api/products/delete/many", body);
  }
};

export default ProductServices;
