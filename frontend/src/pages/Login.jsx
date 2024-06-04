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
import { login } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    mutate: signin,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Container px={6} py={12} textAlign={"center"} mx={"auto"} maxW={"md"}>
          <Heading fontSize={"4xl"} mb={8}>
            Sign into your account
          </Heading>
          <Box rounded={"lg"} bg={"gray.700"} boxShadow={"lg"} p={8}>
            {isError && (
              <Box mb={3} color="red.400">
                Invalid Email or Password
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
                    e.key === "Enter" && signin({ email, password })
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
                onClick={() => signin({ email, password })}
                my={2}
                isDisabled={!email || password.length < 6}
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

export default Login;
