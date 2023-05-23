import React from "react";
import styles from "./widget.module.css";
import { Draggable } from "react-beautiful-dnd";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

const Widget = ({ widget, index, handleEditModal }) => {
  const { description, duedate, status, title, asigneduser, cycle, _id } =
    widget;

  const date = new Date(duedate).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = date.split("/");
  const formatedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

  let finalStatus = "";

  if (status === "backlog") {
    finalStatus = "Backlog";
  } else if (status === "todo") {
    finalStatus = "to do";
  } else if (status === "inprogress") {
    finalStatus = "In Progress";
  } else if (status === "done") {
    finalStatus = "Done";
  }

  return (
    <Draggable draggableId={widget._id} index={index}>
      {(provided) => (
        <div
          className={styles.widget}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.row}>
            <h3 className={styles.title} onClick={() => handleEditModal(_id)}>
              {title}
            </h3>
            <span className={styles.wrapper}>
              <QueryBuilderIcon />
              <p>{cycle?.title}</p>
            </span>
          </div>

          <div className={styles.row}>
            <p>
              {asigneduser?.firstname} {asigneduser?.lastname}
            </p>
            <p className={styles[`status${status}`]}>{finalStatus}</p>
          </div>

          <div className={styles.row}>
            <div>{formatedDate}</div>
            <p>{cycle?.project.title}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Widget;
