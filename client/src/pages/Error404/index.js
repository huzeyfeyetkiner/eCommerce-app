import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  AlertTitle,
} from "@chakra-ui/react";

function Error404() {
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            The page you trying to go not found!
          </AlertDescription>
        </Box>
      </Alert>
    </div>
  );
}
export default Error404;
