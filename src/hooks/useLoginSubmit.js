// import Cookies from 'js-cookie';
// import { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useHistory, useLocation } from 'react-router-dom';
// import { AdminContext } from 'context/AdminContext';
// import AdminServices from 'services/AdminServices';
// import { notifyError, notifySuccess } from 'utils/toast';

// const useLoginSubmit = () => {
//   const [loading, setLoading] = useState(false);
//   const { dispatch } = useContext(AdminContext);
//   const history = useHistory();
//   const location = useLocation();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = ({ name, email, verifyEmail, password, role }) => {
//     setLoading(true);
//     const cookieTimeOut = 0.5;

//     if (location.pathname === '/login') {
//       AdminServices.loginAdmin({ email, password })
//         .then((res) => {
//           if (res) {
//             console.log('Login response:', res);
//             Cookies.set('adminInfo', JSON.stringify(res), {
//               expires: cookieTimeOut,
//             });
//           }
//         })
//         .catch((err) => {
//           console.error('Login error:', err);
//           notifyError(err ? err.response.data.message : err.message);
//           setLoading(false);
//         });
//       setLoading(false);
//       notifySuccess('Login Success!');
//       dispatch({ type: 'USER_LOGIN', payload: { email: email } });
//       localStorage.setItem("email", email)
//       history.replace('/');
//     }

//     if (location.pathname === '/signup') {
//       AdminServices.registerAdmin({ name, email, password, role })
//         .then((res) => {
//           if (res) {
//             setLoading(false);
//             notifySuccess('Register Success!');
//             dispatch({ type: 'USER_LOGIN', payload: res });
//             Cookies.set('adminInfo', JSON.stringify(res), {
//               expires: cookieTimeOut,
//             });
//             history.replace('/');
//           }
//         })
//         .catch((err) => {
//           notifyError(err ? err.response.data.message : err.message);
//           setLoading(false);
//         });
//     }

//     if (location.pathname === '/forgot-password') {
//       AdminServices.forgetPassword({ verifyEmail })
//         .then((res) => {
//           setLoading(false);
//           notifySuccess(res.message);
//         })
//         .catch((err) => {
//           setLoading(false);
//           notifyError(err ? err.response.data.message : err.message);
//         });
//     }
//   };
//   return {
//     onSubmit,
//     register,
//     handleSubmit,
//     errors,
//     loading,
//   };
// };

// export default useLoginSubmit;



// just trying to make user stay at login when its correct from tokens 
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { AdminContext } from 'context/AdminContext';
import AdminServices from 'services/AdminServices';
import { notifyError, notifySuccess } from 'utils/toast';

const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (location.pathname === '/login') {
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          if (res && res.token) {
            console.log('Login response:', res);
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            setLoading(false);
            notifySuccess('Login Success!');
            // dispatch({ type: 'USER_LOGIN', payload: { email: email } });
            dispatch({ type: 'USER_LOGIN', payload: { token: res.token } });
            localStorage.setItem("email", email)
            history.replace('/');
          }
        })
        .catch((err) => {
          console.error('Login error:', err);
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/signup') {
      AdminServices.registerAdmin({ name, email, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess('Register Success!');
            dispatch({ type: 'USER_LOGIN', payload: res });
            Cookies.set('adminInfo', JSON.stringify(res), {
              expires: cookieTimeOut,
            });
            history.replace('/');
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === '/forgot-password') {
      console.log('Forgot Password form submitted:', verifyEmail); // Log the submitted email address

      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          console.log('Password reset response:', res); // Log the response from the backend
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          console.error('Password reset error:', err);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };
  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
