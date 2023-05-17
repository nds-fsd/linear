import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import Widget from "../widget/widget";
import styles from "./column.module.css";

const WidgetList = memo(function WidgetList({ widgets }) {
  return widgets?.map((widget, index) => (
    <Widget widget={widget} index={index} key={widget._id} />
  ));
});

const Column = ({ droppableId, widgets }) => {
  let title = "";
  switch (droppableId) {
    case "backlog":
      title = "Backlog";
      break;
    case "inprogress":
      title = "In Progress";
      break;
    case "done":
      title = "Done";
      break;
    case "todo":
      title = "To do";
      break;
  }

  return (
    <div className={styles.columnContainer}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className={styles.column}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <WidgetList widgets={widgets} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
