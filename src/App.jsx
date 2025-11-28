// // import { Routes, Route } from "react-router-dom";
// // import Dashboard from "./pages/Dashboard";
// // import Users from "./pages/Users";
// // import Coaches from "./pages/Coaches";
// // import FoodPlans from "./pages/FoodPlans";
// // import Assignments from "./pages/Assignments";
// // import Settings from "./pages/Settings";
// // import Login from "./pages/Login";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // function App() {
// //   return (
// //     <Routes>
// //       {/* Login route is public */}
// //       <Route path="/login" element={<Login />} />

// //       {/* Protected routes */}
// //       <Route
// //         path="/"
// //         element={
// //           <ProtectedRoute>
// //             <Dashboard />
// //           </ProtectedRoute>
// //         }
// //       />
// //       <Route
// //         path="/users"
// //         element={
// //           <ProtectedRoute>
// //             <Users />
// //           </ProtectedRoute>
// //         }
// //       />
// //       <Route
// //         path="/coaches"
// //         element={
// //           <ProtectedRoute>
// //             <Coaches />
// //           </ProtectedRoute>
// //         }
// //       />
// //       <Route
// //         path="/food-plans"
// //         element={
// //           <ProtectedRoute>
// //             <FoodPlans />
// //           </ProtectedRoute>
// //         }
// //       />
// //       <Route
// //         path="/assignments"
// //         element={
// //           <ProtectedRoute>
// //             <Assignments />
// //           </ProtectedRoute>
// //         }
// //       />
// //       <Route
// //         path="/settings"
// //         element={
// //           <ProtectedRoute>
// //             <Settings />
// //           </ProtectedRoute>
// //         }
// //       />
// //     </Routes>
// //   );
// // }

// // export default App;
// import './App.module.css';
// import { Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Coaches from "./pages/Coaches";
// import FoodPlans from "./pages/FoodPlans";
// import Exercise from "./pages/Exercise";
// import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";
// import Login from "./pages/Login";
// import Forgot from "./pages/Forgot";
// import Layout from "./components/Layout";
// import Payment from "./pages/Payment";
// import Subscription from "./pages/Subscription";
// import AddRecipe from './pages/AddRecipe';
// import AddExercise from './pages/AddExercise';
// import Reset from './pages/Reset';
// import Success from './pages/Success';

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("adminToken"); // ✅ use the same key as Login.jsx
//   return token ? children : <Navigate to="/login" replace />;
// }


// function App() {
//   return (
//     <Routes>
//       {/* Auth Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot" element={<Forgot />} />
//       <Route path="/reset" element={<Reset />} />
//       <Route path="/success" element={<Success />} />

//       {/* Protected Routes */}
//       <Route
//         path="/"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Dashboard />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/users"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Users />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/coaches"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Coaches />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/food-plans"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <FoodPlans />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/food-plans/add-recipe"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <AddRecipe />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/exercise"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Exercise />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/exercise/add-exercise"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <AddExercise />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/payment"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Payment />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/subscription"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Subscription />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Profile />
//             </Layout>
//           </PrivateRoute>
//         }
//       />

//       <Route
//         path="/settings"
//         element={
//           <PrivateRoute>
//             <Layout>
//               <Settings />
//             </Layout>
//           </PrivateRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


import './App.module.css';
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Coaches from "./pages/Coaches";
import FoodPlans from "./pages/FoodPlans";
import Exercise from "./pages/Exercise";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Layout from "./components/Layout";
import Payment from "./pages/Payment";
import Subscription from "./pages/Subscription";
import AddRecipe from './pages/AddRecipe';
import AddExercise from './pages/AddExercise';
import Reset from './pages/Reset';
import Success from './pages/Success';


function App() {
  return (
    <Routes>
      {/* Auth Routes (still accessible but no protection) */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/success" element={<Success />} />

      {/* All pages are now PUBLIC — no PrivateRoute, no token check */}
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />

      <Route
        path="/coaches"
        element={
          <Layout>
            <Coaches />
          </Layout>
        }
      />

      <Route
        path="/food-plans"
        element={
          <Layout>
            <FoodPlans />
          </Layout>
        }
      />

      <Route
        path="/food-plans/add-recipe"
        element={
          <Layout>
            <AddRecipe />
          </Layout>
        }
      />

      <Route
        path="/exercise"
        element={
          <Layout>
            <Exercise />
          </Layout>
        }
      />

      <Route
        path="/exercise/add-exercise"
        element={
          <Layout>
            <AddExercise />
          </Layout>
        }
      />

      <Route
        path="/payment"
        element={
          <Layout>
            <Payment />
          </Layout>
        }
      />

      <Route
        path="/subscription"
        element={
          <Layout>
            <Subscription />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;


