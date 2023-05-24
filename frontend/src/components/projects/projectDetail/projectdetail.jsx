import { useState, useEffect } from "react";
import styles from "./projectdetail.module.css";
import { getTeamById } from "../../../utils/apiTeam";
import { getCyclesByProject } from "../../../utils/apiCycle";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { capitalizeStr, formatDate } from "../../../utils/formatDates";
import { ProjectDetailsUsers } from "./users/projectdetailsusers";
import ProjectDetailCyclesList from "./cycles/projectdetailcycles";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeOutlet, setActiveOutlet] = useState("users");

  const {
    data,
    isLoading: projectIsLoading,
    isError: projectIsError,
    isSuccess,
  } = useQuery({
    queryKey: ["team",{team:id}],
    queryFn: () => {
      return getTeamById(id);
    },
  });





  const teamData = data?.data;
  const project = teamData?.project;
  const users = teamData?.users;

  return (
    <section className={styles.projectDetails}>
      <div className={styles.container}>
        <div className={styles.colOne}>
          <h2 className={styles.projectTitle}>
            {capitalizeStr(project?.title)}
          </h2>
          <div className={styles.datesContainer}>
            <h3 className={styles.date}>
              Start date:
              {formatDate(project?.startdate)}
            </h3>
            <h3 className={styles.date}>
              Finish date: {formatDate(project?.finishdate)}
            </h3>
          </div>
          <div className={styles.descriptionContainer}>
            <h3>Description</h3>
            <div className={styles.projectTextArea}>
              <p>{project?.description}</p>
            </div>
          </div>
          <div className={styles.cyclesContainer}>

            <ProjectDetailCyclesList
              projectId={project?._id}
            />

          </div>
          <div className={styles.buttonsContainer}>
            <button
              onClick={() => {
                setActiveOutlet("users");
              }}
              className={styles.selectButton}
            >
             Show Team
            </button>
          </div>
        </div>
        <div className={styles.colTwo}>
          {activeOutlet === "users" && <ProjectDetailsUsers users={users} />}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
