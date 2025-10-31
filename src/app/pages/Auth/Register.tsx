import Background from "../../components/Background";
import GlassCard from "../../components/GlassCard";
import { Button } from "../../components/ui/Button";

import Input from "../../components/ui/Input";

import {
  FormRow,
  Header,
  InputGroup,
  Linked,
  SecondaryText,
  SubHeader,
} from "./Auth.style";

const Register = () => {
  return (
    <Background>
      <GlassCard width="400px" height="500px">
        <FormRow>
          <Header size="20px">Addis ሙዚቃ </Header>
          <SubHeader>Welcome Back !</SubHeader>
          <InputGroup>
            <Input placeholder="Username" />
            <Input type="email" placeholder="Enail" />
            <Input type="password" placeholder="Password" />
          </InputGroup>

          <Button>signup</Button>

          <SecondaryText>
            Already Have An Account <Linked href="/signup">Login</Linked>
          </SecondaryText>
        </FormRow>
      </GlassCard>
    </Background>
  );
};

export default Register;
