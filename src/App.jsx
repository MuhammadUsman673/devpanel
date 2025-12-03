
import "./index.css";
import { Routes, Route } from "react-router-dom";
import UsersManagement from "./pages/UsersManagement";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/CoachClients";
import Coaches from "./pages/Coaches";
import FoodPlans from "./pages/FoodPlans";
import Exercise from "./pages/Exercise";
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/success" element={<Success />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
 <Route
          path="users-management"
          element={
            <ProtectedRoute>
              <Layout>
                <UsersManagement/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <Users />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/coaches"
          element={
            <ProtectedRoute>
              <Layout>
                <Coaches />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/food-plans"
          element={
            <ProtectedRoute>
              <Layout>
                <FoodPlans />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/food-plans/add-recipe"
          element={
            <ProtectedRoute>
              <Layout>
                <AddRecipe />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise"
          element={
            <ProtectedRoute>
              <Layout>
                <Exercise />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise/add-exercise"
          element={
            <ProtectedRoute>
              <Layout>
                <AddExercise />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Layout>
                <Payment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Layout>
                <Subscription />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;