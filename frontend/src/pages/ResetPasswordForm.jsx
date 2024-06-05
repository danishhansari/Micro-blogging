import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../lib/api";

// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({ code }) => {
  const [password, setPassword] = useState("");

  const {
    mutate: resetUserPassword,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return (
    <>
      <Heading fontSize={"4xl"} mb={8}>
        Change your password
      </Heading>
      <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
        {isError && (
          <Box mb={3} color={"red.400"}>
            {error?.message || "An error occured"}
          </Box>
        )}
        {isSuccess ? (
          <Box>
            <Alert status="success" borderRadius={12} mb={3}>
              <AlertIcon />
            </Alert>
            <ChakraLink as={Link} to="/login" replace>
              Sign in
            </ChakraLink>
          </Box>
        ) : (
          <Stack spacing={4}>
            <FormControl id="password">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  resetUserPassword({ password, verificationCode: code })
                }
                autoFocus
              />
            </FormControl>
            <Button
              my={2}
              isLoading={isPending}
              isDisabled={password.length < 6}
              onClick={() =>
                resetUserPassword({ password, verificationCode: code })
              }
            >
              Reset Password
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default ResetPasswordForm;
