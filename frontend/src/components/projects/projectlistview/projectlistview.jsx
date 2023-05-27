import { useState } from "react";
import { Table } from "./table/table";
import styles from "./listview.module.css";

function ProjectListView({ data, handleEditModal, handleDeleteModal }) {
    

  return (
    <div className={styles.listView}>
      <Table
        handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
        data={data}
      />
    </div>
  );
}

export default ProjectListView;