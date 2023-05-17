import { useState } from "react";
import { Table } from "./table/Table";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import styles from "./listview.module.css";

function ListView({data, handleEditModal}) {
  const handleDeleteRow = () =>{
    console.log("deleted row")
  }

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
        rows={rows} 
        deleteRow={handleDeleteRow} 
         />
    </div>
  );
}

export default ListView;
