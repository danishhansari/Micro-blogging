import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  Spinner,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../lib/api";

const VerifyEmail = () => {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });
  return (
    <Flex minH={"100vh"} justify={"center"} mt={12}>
      <Container mx={"auto"} maxW={"md"} py={12} px={6} textAlign={"center"}>
        {isPending ? (
          <Spinner />
        ) : (
          <VStack align={"center"} spacing={6}>
            <Alert
              status={isSuccess ? "success" : "error"}
              width={"fit-content"}
              borderRadius={12}
            >
              <AlertIcon />
              {isSuccess ? "Email Verified" : "Invalid Link"}
            </Alert>
            {isError && (
              <Text color="gray.400">
                The link is either invalid or expired.{" "}
                <ChakraLink as={Link} to="/password/reset" replace>
                  Get a new Link
                </ChakraLink>
              </Text>
            )}
            <ChakraLink as={Link} to={"/"} replace>
              Back to Home
            </ChakraLink>
          </VStack>
        )}
      </Container>
    </Flex>
  );
};

export default VerifyEmail;
