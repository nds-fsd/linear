import { useState } from "react";
import droppingAreaStyle from './droppingarea.module.css'


const DroppingArea = ({ children, setWidgets, widgets, columnType }) => {
  function handleOnDrop(e) {
    const widget = e.dataTransfer.getData("widgetTitle").toString();
    setWidgets([...widgets, widget]);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className={droppingAreaStyle.column} onDrop={handleOnDrop} onDragOver={handleDragOver}>
      <h2 className={droppingAreaStyle.header}>{columnType}</h2>
      {children}
    </div>
  );
};

export default DroppingArea;
