import { CSSReset } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";

import AddIssueModal from "./components/modals/AddIssueModal";
import AddProjectModal from "./components/modals/AddProjectModal";
import EditIssueModal from "./components/modals/EditIssueModal";
import EditProjectModal from "./components/modals/EditProjectModal";
import DeleteModal from "./components/modals/DeleteModal";
import AddUserModal from "./components/modals/AddUserModal";
import AddCommentModal from "./components/modals/AddCommentModal";
import EditCommentModal from "./components/modals/EditCommentModal";
import CommentsModal from "./components/modals/CommentModal";
import RemoveUserModal from "./components/modals/RemoveUserModal";
import UsersListModal from "./components/modals/UsersListModal";

const App: React.FC = () => {
  return (
    <>
      <CSSReset />
      <Router>
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
          {/* Add more routes for other pages */}

        </Routes>
      </Router>
          <AddProjectModal />
          <AddCommentModal />
          <AddIssueModal />
          <AddUserModal />
          <CommentsModal />
          <DeleteModal />
          <EditProjectModal />
          <EditCommentModal />
          <EditIssueModal />
          <RemoveUserModal />
          <UsersListModal />
    </>
  );
};

export default App;
