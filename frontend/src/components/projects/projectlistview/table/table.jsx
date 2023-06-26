import { useState, useEffect } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import styles from "./table.module.css";
import { formatDate } from "../../../../utils/formatUtils";

export const Table = ({ data, handleEditModal, handleDeleteModal }) => {
  const rows = data.map((team) => {
    return { row: team.project, teamid: team._id };
  });

  const [sortedProjects, setSortedProjects] = useState([...rows]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setSortedProjects([...rows]);
  }, [data]);

  const sortElementsByStatus = () => {
    const statusOrder = [true, false];
    const sorted = [...rows].sort((projectA, projectB) => {
      const statusIndexA = statusOrder.indexOf(projectA.active);
      const statusIndexB = statusOrder.indexOf(projectB.active);

      // Change the sorting order based on the current sortOrder state
      if (sortOrder === "asc") {
        return statusIndexA - statusIndexB;
      } else {
        return statusIndexB - statusIndexA;
      }
    });

    setSortedProjects(sorted);

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
              <h2>Start date</h2>
            </th>
            <th className={styles.expand}>
              <h2>Due date</h2>
            </th>
            <th className={styles.sort} onClick={sortElementsByStatus}>
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
          {sortedProjects?.map(({ row, teamid }) => {
            const statusText = row?.active ? "Active" : "Inactive";

            return (
              <tr key={row?._id}>
                <td className={styles.titleHeader}>
                  <Link className={styles.titleHeader} to={teamid}>
                    {row?.title}
                  </Link>
                </td>
                <td className={styles.description}>{row?.description}</td>
                <td className={styles.description}>
                  {row ? formatDate(row?.startdate) : ""}
                </td>
                <td className={styles.description}>
                  {row ? formatDate(row?.finishdate) : ""}
                </td>

                <td className={styles[`label-${row?.status}`]}>
                  <span>{statusText}</span>
                </td>
                <td className={styles.fit}>
                  {row ? (
                    <span className={styles.actions}>
                      <DeleteOutlineRoundedIcon
                        className="delete-btn"
                        onClick={() => {
                          handleDeleteModal(teamid);
                        }}
                      />
                      <BorderColorRoundedIcon
                        className="edit-btn"
                        onClick={() => {
                          handleEditModal(row);
                        }}
                      />
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
