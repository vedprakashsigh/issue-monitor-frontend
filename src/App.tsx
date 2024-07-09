import { CSSReset } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const App: React.FC = () => {
  return (
    <>
      <CSSReset />
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<DashboardPage />} />
          {/* Add more routes for other pages */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
