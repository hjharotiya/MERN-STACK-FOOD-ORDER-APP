import React from "react";
import Form from "../../components/shared/form/form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && toast.error(error)}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="../../../assest/images/banner2.jpg" alt="banner2" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle={"Register"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
