// // import requests from "./httpService";


// // Static Data getting


// // const AdminServices = {
// //   registerAdmin: async (body) => {
// //     return {}

// //   },

// //   loginAdmin: async (body) => {
// //     return {}

// //   },

// //   forgetPassword: async (body) => {
// //     return {}

// //   },

// //   resetPassword: async (body) => {
// //     return {}

// //   },

// //   signUpWithProvider: async (body) => {
// //     return {}

// //   },

// //   addStaff: async (body) => {
// //     return {}

// //   },
// //   getAllStaff: async (body) => {
// //     // return requests.get("/admin", body);
// //     return {}

// //   },
// //   getStaffById: async (id, body) => {
// //     return {}

// //   },

// //   updateStaff: async (id, body) => {
// //     return {}

// //   },

// //   updateStaffStatus: async (id, body) => {
// //     return {}

// //   },

// //   deleteStaff: async (id) => {
// //     return {}
// //   },
// // };


// // Dynamic Data getting


// // const AdminServices = {
// //   registerAdmin: async (body) => {
// //     return requests.post("/admin/register", body);
// //   },

// //   loginAdmin: async (body) => {
// //     console.log("hi", body)
// //     return requests.post(`/login`, body);
// //   },

// //   forgetPassword: async (body) => {
// //     return requests.put("/admin/forget-password", body);
// //   },

// //   resetPassword: async (body) => {
// //     return requests.put("/admin/reset-password", body);
// //   },

// //   signUpWithProvider: async (body) => {
// //     return requests.post("/admin/signup", body);
// //   },

// //   addStaff: async (body) => {
// //     return requests.post("/admin/add", body);
// //   },
// //   getAllStaff: async (body) => {
// //     // return requests.get("/admin", body);
// //     return { staff: [{ email: 'admin@test.com' }] }
// //   },
// //   getStaffById: async (id, body) => {
// //     return requests.post(`/admin/${id}`, body);
// //   },

// //   updateStaff: async (id, body) => {
// //     return requests.put(`/admin/${id}`, body);
// //   },

// //   updateStaffStatus: async (id, body) => {
// //     return requests.put(`/admin/update-status/${id}`, body);
// //   },

// //   deleteStaff: async (id) => {
// //     return requests.delete(`/admin/${id}`);
// //   },
// // };

// // export default AdminServices;



// // new backend matching routes for now 



// // services/AdminServices.js

// import requests from "./httpService";

// const AdminServices = {
//   registerAdmin: async (body) => {
//     return requests.post("/api/admin/register", body);
//   },

//   loginAdmin: async (body) => {
//     return requests.post("/api/admin/login", body);
//   },

//   forgetPassword: async (body) => {
//     return requests.put("/api/admin/forget-password", body);
//   },

//   resetPassword: async (body) => {
//     return requests.put("/api/admin/reset-password", body);
//   },

//   addStaff: async (body) => {
//     return requests.post("/api/admin/add", body);
//   },

//   getAllStaff: async () => {
//     return requests.get("/api/admin/");
//   },

//   getStaffById: async (id) => {
//     return requests.get(`/api/admin/${id}`);
//   },

//   updateStaff: async (id, body) => {
//     return requests.put(`/api/admin/update/${id}`, body);
//   },

//   updateStaffStatus: async (id, body) => {
//     return requests.put(`/api/admin/update-status/${id}`, body);
//   },

//   deleteStaff: async (id) => {
//     return requests.delete(`/api/admin/delete/${id}`);
//   },
// };

// export default AdminServices;
// import requests from "./httpService";
// const jwt = require('jsonwebtoken');


// // Static Data getting


// const AdminServices = {
//   registerAdmin: async (body) => {
//     return {}

//   },
//   loginAdmin: async (body) => {
//     // Assuming you have some logic to authenticate the admin and generate a token
//     // For example purposes, let's just generate a simple token with a hardcoded payload
//     const adminPayload = {
//       isAdmin: true,
//       // Add any other relevant admin information here
//     };

//     // Generate a token with the admin payload
//     const token = jwt.sign(adminPayload, 'your_secret_key', { expiresIn: '1h' });

//     // Return the token
//     return { token };
//   },
//   // loginAdmin: async (body) => {
//   //   return {}

//   // },

//   forgetPassword: async (body) => {
//     return {}

//   },

//   resetPassword: async (body) => {
//     return {}

//   },

//   signUpWithProvider: async (body) => {
//     return {}

//   },

//   addStaff: async (body) => {
//     return {}

//   },
//   getAllStaff: async (body) => {
//     // return requests.get("/admin", body);
//     return {}

//   },
//   getStaffById: async (id, body) => {
//     return {}

//   },

//   updateStaff: async (id, body) => {
//     return {}

//   },

//   updateStaffStatus: async (id, body) => {
//     return {}

//   },

//   deleteStaff: async (id) => {
//     return {}
//   },
// };


// Dynamic Data getting


// const AdminServices = {
//   registerAdmin: async (body) => {
//     return requests.post("/admin/register", body);
//   },

//   loginAdmin: async (body) => {
//     console.log("hi", body)
//     return requests.post(`/login`, body);
//   },

//   forgetPassword: async (body) => {
//     return requests.put("/admin/forget-password", body);
//   },

//   resetPassword: async (body) => {
//     return requests.put("/admin/reset-password", body);
//   },

//   signUpWithProvider: async (body) => {
//     return requests.post("/admin/signup", body);
//   },

//   addStaff: async (body) => {
//     return requests.post("/admin/add", body);
//   },
//   getAllStaff: async (body) => {
//     // return requests.get("/admin", body);
//     return { staff: [{ email: 'admin@test.com' }] }
//   },
//   getStaffById: async (id, body) => {
//     return requests.post(`/admin/${id}`, body);
//   },

//   updateStaff: async (id, body) => {
//     return requests.put(`/admin/${id}`, body);
//   },

//   updateStaffStatus: async (id, body) => {
//     return requests.put(`/admin/update-status/${id}`, body);
//   },

//   deleteStaff: async (id) => {
//     return requests.delete(`/admin/${id}`);
//   },
// };

// export default AdminServices;



// new backend matching routes for now 



// services/AdminServices.js

import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/api/admin/register", body);
  },

  loginAdmin: async (body) => {
    return requests.post("/api/admin/login", body);
  },

  forgetPassword: async (body) => {
    // console.log("hi: ", body)
    return requests.put("/api/admin/forget-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/api/admin/reset-password", body);
  },

  addStaff: async (body) => {
    console.log("datas : ", body)
    return requests.post("/api/admin/add", body);
  },

  getAllStaff: async () => {
    return requests.get("/api/admin/");
  },

  getStaffById: async (id) => {
    return requests.get(`/api/admin/${id}`);
  },

  updateStaff: async (id, body) => {
    // return requests.put(`/api/admin/update/${id}`, body);
    return requests.put(`/api/admin/${id}`, body);
  },

  updateStaffStatus: async (id, body) => {
    return requests.put(`/api/admin/update-status/${id}`, body);
  },

  deleteStaff: async (id) => {
    // changed api/admin/delete to admin/${id}
    return requests.delete(`/api/admin/${id}`);
  },
};

export default AdminServices;
