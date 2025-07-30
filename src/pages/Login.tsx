import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    // React에서 Spring 서버로 리다이렉트
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }, []);

  return <div>로그인 중입니다...</div>;
};

export default Login;
