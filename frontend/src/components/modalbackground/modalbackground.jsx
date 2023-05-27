import React from "react";
import modalStyles from "./modalbackground.module.css";

const ModalBackground = ({ children }) => {
  return <div className={modalStyles.modalContainer}>{children}</div>;
};

export default ModalBackground;
