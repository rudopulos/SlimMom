import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  console.log("Rendering Register component...");
  return (
    <div className="container">
      <Header />
      <RegisterForm />
    </div>
  );
};

export default Register;
