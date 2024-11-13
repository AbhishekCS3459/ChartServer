import axios from "axios";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/configs/api";
const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {

      await axios.post(`${API_BASE_URL}/api/users/logout`, {}, { withCredentials: true });

      
        localStorage.removeItem("accessToken");
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return <Button onClick={handleLogout}>Log out</Button>;
};

export default LogoutButton;
