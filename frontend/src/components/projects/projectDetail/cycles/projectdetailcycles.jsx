import { useState } from "react";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

import styles from "./projectdetailcycles.module.css";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { useQuery } from "react-query";
import { getCyclesByProject } from "../../../../utils/apiCycle";
import { formatDate } from "../../../../utils/formatUtils";

const ProjectDetailCyclesList = ({
  projectId,
  handleSelectCycle,
  selectedCycle,
  setShowAddCycleModal
}) => {
  const [cycles, setCycles] = useState([]);

  const {
    data: rawCycles,
    isLoading: cyclesIsLoading,
    isError: cyclesIsError,
    refetch:refetchCycles
  } = useQuery({
    queryKey: ["cycles", { project: projectId }],
    queryFn: () => getCyclesByProject(projectId),
    enabled: !!projectId,
    onSuccess: (data) => {
      setCycles(data.data);
    },
  });

  const cycleElements = cycles?.map((cycle) => {
    const selected = selectedCycle._id === cycle._id;
    return (
      <li
        onClick={() => {
          handleSelectCycle(cycle);
        }}
        key={cycle._id}
        className={selected ? styles.selected : styles.cycleListItem}
      >
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
          <BorderColorRoundedIcon 
          onClick={()=>setShowAddCycleModal(true)}
          className={styles.icon} />
        </div>
      </li>
    );
  });

  return (
    <ul className={styles.cycleList}>
      {cycleElements ? cycleElements : <li>No Sprints to display</li>}
    </ul>
  );
};

export default ProjectDetailCyclesList;
