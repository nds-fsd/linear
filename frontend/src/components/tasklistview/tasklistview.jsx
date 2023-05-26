
import { Table } from "./table/Table";
import styles from "./listview.module.css";

function TaskListView({ data, handleEditModal, handleDeleteModal }) {
  
  const unorderedTasks = Object.keys(data).map((listName) => {
    return data[listName];
  });

  const rows = unorderedTasks.reduce((acc, current) => {
    return [...acc, ...current];
  });

  return (
    <div className={styles.listView}>
      <Table
        isReduced={false}
        handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
        rows={rows}
      />
    </div>
  );
}

export default TaskListView;
