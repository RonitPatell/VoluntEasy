import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthButtons from "./components/AuthButtons";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Home"; // Assuming this is your Home page
import LoginPage from "./pages/Login"; // Assuming this is your Login page

// const Dashboard = () => (
//   <div>
//     <h1>Dashboard: Private Page</h1>
//     <p>Welcome to your private dashboard!</p>
//   </div>
// );

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* Header */}
//         <h1>VoluntEasy</h1>
//         <AuthButtons />

//         {/* Define Routes */}
//         <Routes>
//           {/* Public Home Page */}
//           <Route path="/" element={<HomePage />} />

//           {/* Public Login Page */}
//           <Route path="/login" element={<LoginPage />} />

//           {/* Private Dashboard Page */}
//           <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// Tailwind Test
// export default function App() {
//   return (
//     <div className="h-screen flex items-center justify-center bg-blue-500 text-white text-4xl">
//       Tailwind is Working!
//     </div>
//   );
// }

