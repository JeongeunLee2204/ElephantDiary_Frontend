import Button from "../components/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const login = (): void => {
    navigate("/login");
  };

  const register = (): void => {
    navigate("/register");
  };

  return (
    <div>
      안녕하세요!
      <br />
      <Button label="로그인" onClick={login}></Button>
      <br />
      <Button label="회원가입" onClick={register}></Button>
    </div>
  );
}

export default Home;
