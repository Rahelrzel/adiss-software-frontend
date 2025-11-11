import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";

import {
  Form,
  FormRow,
  Header,
  InputGroup,
  Linked,
  SecondaryText,
  SubHeader,
} from "./Auth.style";
import { Button } from "../../components/ui/Button";
import { FormikInput } from "../../components/ui/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { loginRequest } from "../../stores/user/userSlice";
import { useEffect } from "react";
import { loginSchema } from "./validation";
import { BiLogInCircle } from "react-icons/bi";

const LoginPage = () => {
  const route = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      dispatch(loginRequest(values));
    },
  });

  useEffect(() => {
    if (user.user) {
      route("/dashboard");
    }
  }, [user.user]);

  useEffect(() => {
    if (user.error) {
      if (user.error.field) {
        formik.setFieldError(user.error.field, user.error.msg);
      }
    }
  }, [user.error]);

  return (
    <Background>
      <GlassCard width="400px" height="550px">
        <FormRow>
          <Header size="20px">Addis ሙዚቃ </Header>
          <SubHeader>Welcome Back !</SubHeader>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup>
              <FormikInput
                name="email"
                formik={formik}
                placeholder="Email"
                type="email"
                inputSize="md"
              />
              <FormikInput
                name="password"
                formik={formik}
                placeholder="Password"
                type="password"
                inputSize="md"
              />
              <Linked href="/signup">Forget password</Linked>
            </InputGroup>
            <Button
              width="50"
              type="submit"
              colorScheme="white"
              shape="round"
              glow
              isLoading={user.loading}
              leftIcon={<BiLogInCircle />}
            >
              Login
            </Button>
          </Form>

          <SecondaryText>
            Don’t have an account? <Linked href="/register">Sign up</Linked>
          </SecondaryText>
        </FormRow>
      </GlassCard>
    </Background>
  );
};

export default LoginPage;
