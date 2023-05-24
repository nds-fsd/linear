import React from "react";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import styles from "./projectdetailcycles.module.css";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useQuery } from "react-query";
import { getCyclesByProject } from "../../../../utils/apiCycle";
import { formatDate } from "../../../../utils/formatDates";

const ProjectDetailCyclesList = ({ projectId }) => {
  const {
    data: rawCycles,
    isLoading: cyclesIsLoading,
    isError: cyclesIsError,
  } = useQuery({
    queryKey: ["cycles", { project: projectId }],
    queryFn: () => getCyclesByProject(projectId),
  });

  const cycleElements = rawCycles?.data.map((cycle) => {
    console.log(cycle)

    return (
      <li className={styles.cycleListItem}>
        <div>
          <h2 className={styles.cycleTitle}>{cycle.title}</h2>
          <p>{cycle.status}</p>
        </div>
        <div className={styles.dateWrapper}>
          <div>
            <h3>Start Date</h3>
            <p>{formatDate(cycle.startdate)}</p>
          </div>
          <div>
            <h3>Finish Date</h3>
            <p>{formatDate(cycle.finishdate)}</p>

          </div>
          <KeyboardDoubleArrowRightRoundedIcon className={styles.icon} />
        </div>
      </li>
    );
  });

  return <ul className={styles.cycleList}>{cycleElements? cycleElements : <div>No Sprints to display</div>}</ul>;
};

export default ProjectDetailCyclesList;
