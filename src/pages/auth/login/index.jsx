import React, { useEffect, useState } from "react";
import { NavigationStateContext } from "../../../App";
import Footer from "../../../components/footer";
import SideNavbar from "../../../components/navigation/sideNav";
import TopNavbar from "../../../components/navigation/topNav";
import { useNavigate } from "react-router-dom";
import { Alert, Spin } from "antd";
import { MdEmail, MdLock } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import "./style.scss";

const Login = (props) => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      handleLogin();
    },
  });

  const handleLogin = async () => {
    setConfirmLoading(true);

    const bodyParams = {
      email: formik.values.email,
      password: formik.values.password,
    };

    try {
      await axios
        .post(props.apiUrl.login, bodyParams)
        .then((res) => {
          setInputEmailActive(false);
          setInputPasswordActive(false);
          formik.resetForm();

          localStorage.setItem("access_token", res.data.access_token);
          window.location.reload();
        })
        .catch((err) => {
          setInputEmailActive(false);
          setInputPasswordActive(false);
          formik.resetForm();
          setConfirmLoading(false);

          if (err.response.status === 403) {
            setShowAlert(true);
            setAlertMessage(err.response.data.message);
          }

          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Cookpedia - Login";
  }, []);

  return (
    <>
      <div className="login-container">
        <NavigationStateContext.Provider
          value={[showSideNavbar, setShowSideNavbar, props.apiUrl]}
        >
          <SideNavbar setCurrentPage={props.setCurrentPage} />
          <TopNavbar setCurrentPage={props.setCurrentPage} />
        </NavigationStateContext.Provider>

        <div className="page-container">
          <div className="page-content">
            <div className="card">
              <div className="card-header">
                <div className="card-header-container">
                  <p className="card-title">Cookpedia</p>
                  <p className="card-header-text">Login</p>
                </div>
              </div>

              <div className="card-body">
                {showAlert && (
                  <Alert
                    style={{ width: "100%" }}
                    message={alertMessage}
                    type="error"
                  />
                )}

                {confirmLoading ? (
                  <div className="spin-container">
                    <Spin size="large" tip="authenticating..." />
                  </div>
                ) : (
                  <form action="#">
                    <div className={inputEmailActive ? "item focus" : "item"}>
                      <div className="icon">
                        <MdEmail size={18} />
                      </div>

                      <div>
                        <p>Email</p>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={() => {
                            formik.values.email === ""
                              ? setInputEmailActive(false)
                              : setInputEmailActive(true);
                          }}
                          onFocus={() => {
                            setInputEmailActive(true);
                          }}
                        />
                      </div>
                    </div>

                    {formik.touched["email"] &&
                      Boolean(formik.errors["email"]) && (
                        <div className="error-msg">
                          <p>*{formik.errors["email"]}</p>
                        </div>
                      )}

                    <div
                      className={inputPasswordActive ? "item focus" : "item"}
                    >
                      <div className="icon">
                        <MdLock size={18} />
                      </div>

                      <div>
                        <p>Password</p>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.values.password === ""
                              ? setInputPasswordActive(false)
                              : setInputPasswordActive(true)
                          }
                          onFocus={() => {
                            setInputPasswordActive(true);
                            setShowAlert(false);
                          }}
                        />
                      </div>
                    </div>

                    {formik.touched["password"] &&
                      Boolean(formik.errors["password"]) && (
                        <div className="error-msg">
                          <p>*{formik.errors["password"]}</p>
                        </div>
                      )}

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Sign in
                    </button>

                    <p>
                      Don't have account?{" "}
                      <a
                        href="/register"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/register");
                        }}
                      >
                        Register here
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Login;
