import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = () => {
  console.log("Rendering Login component...");
  return (
    <div className="container">
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;
