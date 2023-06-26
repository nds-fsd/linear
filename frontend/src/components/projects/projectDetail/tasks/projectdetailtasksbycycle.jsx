import { useState } from "react";
import { useQuery } from "react-query";
import styles from "./projectdetailtasksbycycle.module.css";
import { Table } from "../../../tasklistview/table/Table";
import Spinner from "../../../spinner/spinner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";


const ProjectDetailTasksByCycle = ({ taskRows, isLoading, setSelectedTask, setShowEditModal, setShowAddModal }) => {
  const handleDeleteModal = () => {
    
  };

  const handleEditModal = (taskid) => {
    setShowEditModal(true)
    setSelectedTask(taskid)
  };

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.listHeader}>
      <h2>Issues</h2>
      <button onClick={() => setShowAddModal(true)} className={styles.btn}>
          <AddCircleOutlineOutlinedIcon />
          Add Issue
      </button>

      </div>
      {isLoading ? (
        <Spinner/>
      ) : (
        <Table
          isReduced={true}
          handleEditModal={handleEditModal}
          handleDeleteModal={handleDeleteModal}
          rows={taskRows}
        />
      )}
    </div>
  );
};

export default ProjectDetailTasksByCycle;
