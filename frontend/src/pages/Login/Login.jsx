import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { authLogin } from "../../api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/authSlice";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      password: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authLogin(loginInfo);
    if (res.status === 200) {
      dispatch(setUser(res.data));
      navigate("/");
    }
  };

  return (
    <Box maxW="480px" margin="1rem auto">
      <Heading size="md" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb="0.5rem">
          <FormLabel>Username:</FormLabel>
          <Input type="text" name="username" onChange={handleUsernameChange} />
        </FormControl>
        <FormControl isRequired mb="1rem">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
