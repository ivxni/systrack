import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import NotFound from "./pages/404/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Redirect from "./pages/redirect/Redirect"
import MyProfile from "./pages/dashboard/myprofile/MyProfile";
import Computers from "./pages/dashboard/computers/Computers";
import Users from "./pages/dashboard/users/Users";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="computers" element={<Computers />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
