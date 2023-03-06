import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import Profile from "./Components/Profile";
import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/profile-list" element={<Profile></Profile>} />
        <Route path="/user-profile" element={<UserProfile></UserProfile>} />
      </Routes>
    </div>
  );
}
export default App;
