import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import Widget from "../widget/widget";
import styles from './column.module.css'


const WidgetList = memo(function WidgetList({ widgets }) {
  console.log(widgets);
  return widgets?.map((widget, index) => (
    <Widget widget={widget} index={index} key={widget._id} />
  ));
});

const Column = ({ droppableId, widgets }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          className={styles.column}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h1>{droppableId}</h1>
          <WidgetList widgets={widgets} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
