import React from "react";
import Form from "../../components/shared/form/form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-8 form-banner">
            <img src="../../../assest/images/banner1.jpg" alt="banner" />
          </div>
          <div className="col-md-4 form-container">
            <Form formTitle={"login"} submitBtn={"Login"} formType={"login"} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
