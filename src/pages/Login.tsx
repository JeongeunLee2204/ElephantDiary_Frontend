import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 text-gray-700 text-xl">
      로그인 중입니다...
    </div>
  );
};

export default Login;
