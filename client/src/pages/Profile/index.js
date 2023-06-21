import { useAuth } from "../../contexts/AuthContext";
import { Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Profile() {
  //user state içerisinden kullanıcı bilgileri alınıyor.
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <Text fontSize="22px" fontWeight="bold">
        Profile
      </Text>

      <code>{JSON.stringify(user)}</code>

      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
}
export default Profile;
