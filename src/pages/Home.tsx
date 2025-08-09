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
      코끼리 일기장에 오신 걸 환영합니다!
      <br />
      <Button label="시작하기" onClick={login}></Button>
    </div>
  );
}

export default Home;
