import { CSSReset } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";

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
