import { useState, useEffect } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./Table.module.css";

export const Table = ({ rows, deleteRow, handleEditModal }) => {
  const [sortedTasks, setSortedTasks] = useState([...rows]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setSortedTasks([...rows]);
  }, [rows]);

  const sortTasksByStatus = () => {
    const statusOrder = ["backlog", "todo", "inprogress", "done"];

    const sorted = [...rows].sort((taskA, taskB) => {
      const statusIndexA = statusOrder.indexOf(taskA.status);
      const statusIndexB = statusOrder.indexOf(taskB.status);

      // Change the sorting order based on the current sortOrder state
      if (sortOrder === "asc") {
        return statusIndexA - statusIndexB;
      } else {
        return statusIndexB - statusIndexA;
      }
    });

    setSortedTasks(sorted);

    // Toggle the sortOrder state
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th>
              <h2>Title</h2>
            </th>
            <th className={styles.expand}>
              <h2>Description</h2>
            </th>
            <th className={styles.expand}>
              <h2>Project</h2>
            </th>
            <th className={styles.expand}>
              <h2>Cycle</h2>
            </th>
            <th className={styles.sort} onClick={sortTasksByStatus}>
              <h2>Status</h2>
              {sortOrder === "asc" ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )}
            </th>
            <th>
              <h2>Actions</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map((row) => {
            const statusText =
              row.status.charAt(0).toUpperCase() + row.status.slice(1);

            return (
              <tr key={row._id}>
                <td>{row.title}</td>
                <td className={styles.expand}>{row.description}</td>
                <td className={styles.expand}>{row.cycle.project.title}</td>
                <td className={styles.expand}>{row.cycle.title}</td>
                <td className={styles[`label-${row.status}`]}>
                  <span>{statusText}</span>
                </td>
                <td className={styles.fit}>
                  <span className={styles.actions}>
                    <DeleteOutlineRoundedIcon
                      className="delete-btn"
                      onClick={() => deleteRow()}
                    />
                    <BorderColorRoundedIcon
                      className="edit-btn"
                      onClick={() => {handleEditModal(row._id)}}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
