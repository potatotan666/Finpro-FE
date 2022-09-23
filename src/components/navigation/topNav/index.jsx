import React, { useContext, useEffect, useState } from "react";
import { NavigationStateContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import "./style.scss";
import ModalCreate from "../../modalCreate";

const TopNavbar = (props) => {
  const [isScroll, setIsScroll] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const sideNavbarState = useContext(NavigationStateContext);
  const navigate = useNavigate();

  const handleNavigate = (event, path) => {
    event.preventDefault();
    props.setCurrentPage(1);
    navigate(path);
  };

  const listenScrollEvent = () => {
    if (window.scrollY < 1) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  });

  return (
    <>
      <div
        className={
          isScroll ? "top-navbar-container scroll" : "top-navbar-container"
        }
      >
        <div className="left-content">
          <a href="/" className="logo" onClick={(e) => handleNavigate(e, "/")}>
            Cookpedia
          </a>
        </div>

        <div className="right-content">
          <a
            href="/"
            className="nav-item"
            onClick={(e) => handleNavigate(e, "/")}
          >
            <button>Home</button>
          </a>

          {localStorage.getItem("access_token") ? (
            <>
              <a
                href="/"
                className="nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  setModalVisible(true);
                }}
              >
                <button>🍳 Cook</button>
              </a>

              <a
                href="/"
                className="nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("access_token");
                  window.location.reload();
                }}
              >
                <button className="auth">Logout</button>
              </a>
            </>
          ) : (
            <>
              {window.location.pathname === "/login" ? (
                <a
                  href="/register"
                  className="nav-item"
                  onClick={(e) => handleNavigate(e, "/register")}
                >
                  <button className="auth">Register</button>
                </a>
              ) : (
                <a
                  href="/login"
                  className="nav-item"
                  onClick={(e) => handleNavigate(e, "/login")}
                >
                  <button className="auth">Login</button>
                </a>
              )}
            </>
          )}

          <button
            className="icon-expand"
            onClick={() => sideNavbarState[1](true)}
          >
            <MdMenu size={24} />
          </button>
        </div>
      </div>

      <ModalCreate
        visible={modalVisible}
        setVisible={setModalVisible}
        apiUrl={sideNavbarState[2]}
      />
    </>
  );
};

export default TopNavbar;
