import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Link as ChakraLink,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Container px={6} py={12} textAlign={"center"} mx={"auto"} maxW={"md"}>
          <Heading fontSize={"4xl"} mb={8}>
            Create an Account
          </Heading>
          <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
            {isError && (
              <Box mb={3} color="red.400">
                {error?.message || "An error occured"}
              </Box>
            )}
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  value={email}
                  autoFocus
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  autoFocus
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    signup({ email, password, confirmPassword })
                  }
                ></Input>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  value={confirmPassword}
                  autoFocus
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    signup({ email, password, confirmPassword })
                  }
                ></Input>
              </FormControl>
              <ChakraLink
                as={Link}
                to={"/password/forgot"}
                fontSize={"small"}
                textAlign={{ base: "center", sm: "right" }}
              >
                Forgot Password
              </ChakraLink>
              <Button
                isLoading={isPending}
                onClick={() => register({ email, password, confirmPassword })}
                my={2}
                isDisabled={!email || password.length < 6 || !confirmPassword}
              >
                Sign in
              </Button>
              <Text align="center" fontSize="sm" color="text.muted">
                Don&apos;t have an account? {""}
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

export default Register;
