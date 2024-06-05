import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  Text,
  Link as ChakraLink,
  Heading,
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const {
    mutate: sendPasswordReset,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <>
      <Flex minH={"100vh"} align={'center'} justify={"center"} mt={12}>
        <Container mx={"auto"} maxW={"md"} py={12} px={6} textAlign={"center"}>
          <Heading fontSize={"4xl"} mb={8}>
            Reset Your Password
          </Heading>
          <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
            {isError && (
              <Box mb={3} color={"red.400"}>
                {error?.message || "An error occured"}
              </Box>
            )}
            <Stack spacing={4}>
              {isSuccess ? (
                <Alert status="success" borderRadius={12}>
                  <AlertIcon />
                  Email sent, Check your inbox for further instructions.
                </Alert>
              ) : (
                <>
                  <FormControl id="email">
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      value={email}
                      autoFocus
                      type="email"
                      placeholder="Enter Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    isLoading={isPending}
                    onClick={() => sendPasswordReset(email)}
                    my={2}
                    isDisabled={!email}
                  >
                    Reset Password
                  </Button>
                </>
              )}
              <Text align={"center"} fontSize={"sm"} color={"text.muted"}>
                Go Back to{" "}
                <ChakraLink as={Link} to={"/login"}>
                  Sign in
                </ChakraLink>

                &nbsp;or&nbsp;
                <ChakraLink as={Link} to={"/register"}>
                  Sign up
                </ChakraLink>
              </Text>
            </Stack>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default ForgotPassword;
