import { BiLogInCircle } from "react-icons/bi";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { Button } from "../../components/ui/Button";
import { FormikInput } from "../../components/ui/Input";

import {
  Form,
  FormRow,
  Header,
  InputGroup,
  Linked,
  SecondaryText,
  SubHeader,
} from "./Auth.style";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/utils/hooks";
import { useFormik } from "formik";
import { registerSchema } from "./validation";
import { signUpRequest } from "../../stores/user/userSlice";
import { useEffect } from "react";

const Register = () => {
  const route = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      dispatch(signUpRequest(values));
      console.log("Submitting signup form:", values);
    },
  });

  useEffect(() => {
    if (user.user) {
      route("/login");
    }
  }, [user.user]);

  useEffect(() => {
    if (user.error && user.error.field) {
      formik.setFieldError(user.error.field, user.error.msg);
    }
  }, [user.error]);

  return (
    <Background>
      <GlassCard width="400px" height="600px">
        <FormRow>
          <Header size="20px">Addis ሙዚቃ </Header>
          <SubHeader>Welcome Back !</SubHeader>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup>
              <FormikInput
                name="username"
                formik={formik}
                placeholder="UserName"
                type="username"
                inputSize="md"
              />
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
              signup
            </Button>
            <SecondaryText>
              Already Have An Account <Linked href="/login">Login</Linked>
            </SecondaryText>
          </Form>
        </FormRow>
      </GlassCard>
    </Background>
  );
};

export default Register;
