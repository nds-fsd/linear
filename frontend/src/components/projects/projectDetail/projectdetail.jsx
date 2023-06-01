import { useState, useEffect } from "react";
import styles from "./projectdetail.module.css";
import { getTeamById } from "../../../utils/apiTeam";
import AddCycleModal from "../../addcyclemodal/addcyclemodal";
import { getAllTasks } from "../../../utils/apitask";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import {
  capitalizeStr,
  formatDate,
  unorderTasks,
} from "../../../utils/formatUtils";
import { ProjectDetailsUsers } from "./users/projectdetailsusers";
import ProjectDetailCyclesList from "./cycles/projectdetailcycles";
import ProjectDetailTasksByCycle from "./tasks/projectdetailtasksbycycle";
import EditTaskModal from "../../edittaskmodal/edittaskmodal";
import AddTaskModal from "../../addtaskmodal/addtaskmodal";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeOutlet, setActiveOutlet] = useState("users");
  const [selectedCycle, setSelectedCycle] = useState("");
  const [taskRows, setTaskRows] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddCycleModal, setShowAddCycleModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const navigate = useNavigate();

  const {
    data,
    isLoading: projectIsLoading,
    isError: projectIsError,
    isSuccess,
  } = useQuery({
    queryKey: ["team", { team: id }],
    queryFn: () => {
      return getTeamById(id);
    },
  });

  const teamData = data?.data;
  const project = teamData?.project;
  const users = teamData?.users;

  const handleSelectCycle = (cycleid) => {
    setActiveOutlet("tasks");
    setSelectedCycle(cycleid);
  };

  const { data: taskData, isLoading: taskLoading } = useQuery({
    queryKey: ["tasks", { cycle: selectedCycle }],
    queryFn: () => getAllTasks({ cycle: selectedCycle }),
    enabled: !!selectedCycle,
    retry: false,
    onSuccess: (data) => {
      const tasks = data.data;
        const rows = unorderTasks(tasks);
        setTaskRows(rows)
    },
    onError: (err) => {
      console.log(err)
      setTaskRows([])},
  });

  return (
    <section className={styles.projectDetails}>
      <div className={styles.container}>
        <div className={styles.colOne}>
          <div className={styles.titleContainer}>
            <h2 className={styles.projectTitle}>
              {capitalizeStr(project?.title)}
            </h2>
            <div className={styles.btnWrapper}>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className={styles.goBackBtn}
              >
                go back
              </button>
              <button
                onClick={() => {
                  setShowAddCycleModal(true)
                }}
                className={styles.addCycleBtn}
              >
                <AddCircleOutlineOutlinedIcon/>
                Add Cycle
              </button>
            </div>
          </div>
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
              selectedCycle={selectedCycle}
              handleSelectCycle={handleSelectCycle}
              projectId={project?._id}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              onClick={() => {
                setSelectedCycle("");
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
          {activeOutlet === "tasks" && (
            <ProjectDetailTasksByCycle
              setShowAddModal={setShowAddModal}
              setShowEditModal={setShowEditModal}
              setSelectedTask={setSelectedTask}
              isLoading={taskLoading}
              taskRows={taskRows}
            />
          )}
        </div>
      </div>
      {showEditModal && (
        <EditTaskModal taskId={selectedTask} closeModal={setShowEditModal} />
      )}
      {showAddModal && <AddTaskModal defaultValues={{project:project._id, cycle:selectedCycle}} setShowModal={setShowAddModal} />}
      {showAddCycleModal&& <AddCycleModal  project={project} setShowModal={setShowAddCycleModal}/>}
    </section>
  );
};

export default ProjectDetail;
