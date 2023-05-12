import React from "react";
import styles from "./widget.module.css";
import { Draggable } from "react-beautiful-dnd";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const Widget = ({ widget, index }) => {
  const { description, duedate, status, title, asigneduser} = widget
  
  const formatedDate = new Date(duedate).toLocaleString().split(',')[0]

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
          <h3>{title}</h3>
          <span className={styles.wrapper}>
            <QueryBuilderIcon/><p>Sprint-X</p>
          </span> 
         </div> 
         
         <div className={styles.row}>
          <p>{asigneduser?.firstname}</p><p>{status}</p>
         </div>

        <div className={styles.row}>
          <div>{formatedDate}</div>
        </div>

        </div>
      )}
    </Draggable>
  );
};

export default Widget;
