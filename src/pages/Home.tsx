import Button from "../components/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const login = (): void => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800 p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-600">
        🐘 코끼리 일기장에 오신 걸 환영합니다!
      </h1>
      <p className="text-lg text-gray-600 mb-8">ㅇㅇㅇㅇ</p>
      <Button label="시작하기" onClick={login} />
    </div>
  );
}

export default Home;
