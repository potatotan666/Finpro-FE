import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

import "./modalRatingStyle.scss"

const ModalRating = (props) => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/login");
  };

  const handleCanel = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        title="Enjoying this recipe?"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCanel}
        centered
      >
        <div className="modal-rating-container">
          <h2>Login to your account to rate this recipe</h2>
        </div>
      </Modal>
    </>
  );
};

export default ModalRating;
