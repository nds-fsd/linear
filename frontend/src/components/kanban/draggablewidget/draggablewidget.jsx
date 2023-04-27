import { useState } from "react";
import draggableWidgetStyle from "./draggablewidget.module.css";

const DraggableWidget = ({ id, widgetList }) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);

  //me parece que para modificar el css durante el dragging voy a necesitar usar useRef

  function handleOnDragStart(e, i) {
    const widgetIndex = widgetList.findIndex((element) => element === id);
    widgetList.splice(widgetIndex, 1);
    setIsBeingDragged(true);
    console.log(`task ${id} started being dragged`);
    e.dataTransfer.setData("widgetId", id);

  }

  function handleOnDragEnter(e) {
    setIsBeingDragged(true);
    console.log("Entering the dragside");
  }

  function handleOnDrag(e) {
    console.log("item being dragged");
  }

  function handleOnDragEnd(e) {
    setIsBeingDragged(false);
    console.log("Item stopped being dragged");
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
       {`task ${id}`}
    </div>
  );
};

export default DraggableWidget;
