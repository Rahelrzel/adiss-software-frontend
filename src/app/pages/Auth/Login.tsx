import styled from "@emotion/styled";
import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";

import Input from "../../components/ui/Input";

import {
  FormRow,
  Header,
  InputGroup,
  Linked,
  SecondaryText,
  SubHeader,
} from "./Auth.style";
import { Button } from "../../components/ui/Button";

function LoginPage() {
  return (
    <Background>
      <GlassCard width="400px" height="500px">
        <FormRow>
          <Header size="20px">Addis ሙዚቃ </Header>
          <SubHeader>Welcome Back !</SubHeader>
          <InputGroup>
            <Input placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Linked href="/signup">Forget password</Linked>
          </InputGroup>
          <Button>Login</Button>

          <SecondaryText>
            Don’t have an account? <Linked href="/signup">Sign up</Linked>
          </SecondaryText>
        </FormRow>
      </GlassCard>
    </Background>
  );
}

export default LoginPage;
