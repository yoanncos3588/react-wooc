import { useNavigate } from "react-router-dom";
import FormLogin from "../components/FormLogin";
import PageTitle from "../components/PageTitle";
const LoginPage = () => {
  const navigate = useNavigate();
  function handleSuccess() {
    navigate("/");
  }
  return (
    <>
      <PageTitle title="Se connecter" />
      <FormLogin handleSuccess={handleSuccess} />
    </>
  );
};

export default LoginPage;
