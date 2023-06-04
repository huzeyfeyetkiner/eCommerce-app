import { useAuth } from "../../contexts/AuthContext";
import { Text } from "@chakra-ui/react";

function Profile() {
  //user state içerisinden kullanıcı bilgileri alınıyor.
  const { user } = useAuth();

  return (
    <div>
      <Text fontSize="22px" fontWeight="bold">
        Profile
      </Text>

      <code>{JSON.stringify(user)}</code>
    </div>
  );
}
export default Profile;
