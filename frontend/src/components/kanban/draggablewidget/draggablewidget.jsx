import { useState } from "react";
import draggableWidgetStyle from "./draggablewidget.module.css";

const DraggableWidget = ({ title, updateWidgetList, widgetList }) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  //me parece que para modificar el css durante el dragging voy a necesitar usar useRef

  function handleOnDragStart(e, i) {
    const widgetIndex = widgetList.findIndex((element) => element === title);
    widgetList.splice(widgetIndex, 1);
    setIsBeingDragged(true);
    e.dataTransfer.setData("widgetTitle", title);
  }

  function handleOnDragEnter(e) {
    setIsBeingDragged(true);
  }

  function handleOnDrag(e) {
  }

  function handleOnDragEnd(e) {
    setIsBeingDragged(false);
  }

  return (
    <div
      className={
        isBeingDragged
          ? `${draggableWidgetStyle.beingDragged} ${draggableWidgetStyle.widget}`
          : draggableWidgetStyle.widget
      }
      draggable
      onDragStart={(e) => handleOnDragStart(e)}
      onDrag={(e) => handleOnDrag()}
      onDragEnd={handleOnDragEnd}
    >
      {`task ${title}`}
    </div>
  );
};

export default DraggableWidget;
