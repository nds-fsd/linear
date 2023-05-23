import { useState } from "react";
import { Table } from "./table/Table";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import styles from "./listview.module.css";

function ListView({data, handleEditModal, handleDeleteModal}) {


  const unorderedTasks = Object.keys(data).map(listName => {
    return data[listName]
  })

  const rows = unorderedTasks.reduce((acc, current)=>{
    return [...acc, ...current]
  })

  return (
    <div className={styles.listView}>
      <Table
        handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
        rows={rows} 
         />
    </div>
  );
}

export default ListView;
