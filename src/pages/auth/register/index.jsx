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

const Register = (props) => {
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputNameActive, setInputNameActive] = useState(false);
  const [inputEmailActive, setInputEmailActive] = useState(false);
  const [inputPasswordActive, setInputPasswordActive] = useState(false);
  const [inputPasswordConfActive, setInputPasswordConfActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("password")], "password doesn't match")
      .required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: () => {
      handleRegister();
    },
  });

  const handleNavigateTimeout = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleRegister = async () => {
    setConfirmLoading(true);

    const bodyParams = {
      name: formik.values.name,
      email: formik.values.email,
      password: formik.values.password,
      password_confirmation: formik.values.password_confirmation,
    };

    try {
      await axios
        .post(props.apiUrl.register, bodyParams)
        .then((res) => {
          setInputNameActive(false);
          setInputEmailActive(false);
          setInputPasswordActive(false);
          setInputPasswordConfActive(false);
          formik.resetForm();
          setConfirmLoading(false);
          setAlertMessage(
            "Registration success! You can login into your account."
          );
          setAlertType("success");
          setShowAlert(true);
          handleNavigateTimeout();
        })
        .catch((err) => {
          setInputNameActive(false);
          setInputEmailActive(false);
          setInputPasswordActive(false);
          setInputPasswordConfActive(false);
          formik.resetForm();
          setConfirmLoading(false);

          if (err.response.status === 400) {
            setAlertMessage(err.response.data.message);
            setAlertType("error");
            setShowAlert(true);
          }

          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Cookpedia - Register";
  }, []);

  return (
    <>
      <div className="register-container">
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
                  <p className="card-header-text">Register</p>
                </div>
              </div>

              <div className="card-body">
                {showAlert && (
                  <Alert
                    style={{ width: "100%" }}
                    message={alertMessage}
                    type={alertType}
                  />
                )}

                {confirmLoading ? (
                  <div className="spin-container">
                    <Spin size="large" tip="creating your account..." />
                  </div>
                ) : (
                  <form action="#">
                    <div className={inputNameActive ? "item focus" : "item"}>
                      <div className="icon">
                        <MdEmail size={18} />
                      </div>

                      <div>
                        <p>Name</p>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={() => {
                            formik.values.name === ""
                              ? setInputNameActive(false)
                              : setInputNameActive(true);
                          }}
                          onFocus={() => {
                            setInputNameActive(true);
                          }}
                        />
                      </div>
                    </div>

                    {alertType !== "success" && (
                      <>
                        {formik.touched["name"] &&
                          Boolean(formik.errors["name"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["name"]}</p>
                            </div>
                          )}
                      </>
                    )}

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

                    {alertType !== "success" && (
                      <>
                        {formik.touched["email"] &&
                          Boolean(formik.errors["email"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["email"]}</p>
                            </div>
                          )}
                      </>
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

                    {alertType !== "success" && (
                      <>
                        {formik.touched["password"] &&
                          Boolean(formik.errors["password"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["password"]}</p>
                            </div>
                          )}
                      </>
                    )}

                    <div
                      className={
                        inputPasswordConfActive ? "item focus" : "item"
                      }
                    >
                      <div className="icon">
                        <MdLock size={18} />
                      </div>

                      <div>
                        <p>Re-Type Password</p>
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          value={formik.values.password_confirmation}
                          onChange={formik.handleChange}
                          onBlur={() =>
                            formik.values.password_confirmation === ""
                              ? setInputPasswordConfActive(false)
                              : setInputPasswordConfActive(true)
                          }
                          onFocus={() => {
                            setInputPasswordConfActive(true);
                            setShowAlert(false);
                          }}
                        />
                      </div>
                    </div>

                    {alertType !== "success" && (
                      <>
                        {formik.touched["password_confirmation"] &&
                          Boolean(formik.errors["password_confirmation"]) && (
                            <div className="error-msg">
                              <p>*{formik.errors["password_confirmation"]}</p>
                            </div>
                          )}
                      </>
                    )}

                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                    >
                      Sign up
                    </button>

                    <p>
                      Already have account?{" "}
                      <a
                        href="/login"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/login");
                        }}
                      >
                        Login here
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

export default Register;
