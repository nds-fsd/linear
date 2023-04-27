import { useState } from "react";
import droppingAreaStyle from './droppingarea.module.css'


const DroppingArea = ({ children, setWidgets, widgets }) => {
  function handleOnDrop(e) {
    const widget = e.dataTransfer.getData("widgetTitle").toString();
    setWidgets([...widgets, widget]);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className={droppingAreaStyle.page} onDrop={handleOnDrop} onDragOver={handleDragOver}>
      {children}
    </div>
  );
};

export default DroppingArea;
