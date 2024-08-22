import Profile from "../../components/profile";
import { useAuth0 } from "@auth0/auth0-react";
import rutaBack from "../../redux/actions/rutaBack";
import axios from "axios";
const UserData = () => {
  const { user, isAuthenticated } = useAuth0();

  const sendInfoBack = async () => {
    if (isAuthenticated && user) {
      try {
        await axios.post(`${rutaBack}/users/api`, user); // Cambia esta URL según tu API
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  return (
    <div>
      <Profile />
      <button onClick={sendInfoBack}>SendInfoBack</button>
    </div>
  );
};

export default UserData;
