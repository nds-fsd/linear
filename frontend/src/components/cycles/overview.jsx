import { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllTasks, getTasksByProject } from "../../utils/apitask";
import { getAllCycles, getCyclesByProject } from "../../utils/apiCycle";
import KanbanDnd from "../kanban-dnd/kanban-dnd";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import { Context } from "../../Context";
import MOCK_DATA from "../kanban-dnd/mock-data";
import styles from "./overview.module.css";
import PageHeader from "../pageheader/pageheader";
import TaskListView from "../tasklistview/tasklistview";
import EditTaskModal from "../edittaskmodal/edittaskmodal";
import DeleteModal from "../confirmdeletemodal/confirmdeletemodal";

const Overview = () => {
  const {
    userSessionContext: { id: userid, firstname, lastname },
    teams,
  } = useContext(Context);
  const [activeView, setActiveview] = useState("kanban");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterData, setFilterData] = useState({
    type: "complex",
    teams: teams,
    selectedProject: { value: "", label: "Select one..." },
    selectedCycles: [],
    cycles: [],
    dataToDisplay:{}
  });
  const [data, setData] = useState(MOCK_DATA);
  const [taskId, setTaskId] = useState("");
  const queryClient = useQueryClient();

  // const userFullName = `${firstname} ${lastname}`;

  useEffect(() => {
    setFilterData((prevState) => {
      return { ...filterData, teams: teams };
    });
  }, [teams]);

  const {
    data: tasks,
    isLoading: taskLoading,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["tasks", { project: filterData.selectedProject }],
    queryFn: () => {
      return getTasksByProject(filterData.selectedProject.value);
    },
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (tasks) => {
        setData(tasks.data);
        setFilterData(prevData => {
          return{...prevData, dataToDisplay:tasks.data}
        })
    },
    onError: (err) => {
      setData(MOCK_DATA);
    },
  });

  const {
    data: cycles,
    isLoading: cyclesIsLoading,
    refetch: refetchCycles,
  } = useQuery({
    queryKey: ["cycles", { project: filterData.selectedProject?.value }],
    queryFn: () => getCyclesByProject(filterData.selectedProject?.value),
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setFilterData((prevState) => {
        const cyclesWithLabel = data.data.map((cycle) => {
          return { label: cycle.title, value: cycle._id };
        });
        return {
          ...prevState,
          selectedCycles: cyclesWithLabel,
          cycles: cyclesWithLabel,
        };
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleEditModal = (taskid) => {
    setTaskId(taskid);
    setShowEditModal(true);
  };
  const handleDeleteModal = (taskid) => {
    setTaskId(taskid);
    setShowDeleteModal(true);
  };

  const headerElements = Object.keys(MOCK_DATA).map((columnHeader) => {
    let headerName = "";
    if (columnHeader === "backlog") {
      headerName = "Backlog";
    } else if (columnHeader === "todo") {
      headerName = "To do";
    } else if (columnHeader === "inprogress") {
      headerName = "In progress";
    } else if (columnHeader === "done") {
      headerName = "Done";
    }
    return (
      <h2 className={styles.headerElement} key={headerName}>
        {headerName}
      </h2>
    );
  });

  return (
    <div className={styles.cycles}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        refetchFn={refetchTasks}
        title="Overview"
        btntitle="task"
        btnFunction={setShowAddModal}
        filterData={filterData}
        setFilterData={setFilterData}
        setData={setData}
        data={data}
      />
      {showAddModal && <AddTaskModal setShowModal={setShowAddModal} />}
      {showEditModal && (
        <EditTaskModal taskId={taskId} closeModal={setShowEditModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          taskId={taskId}
          deletedSchema={"task"}
          cancelFn={setShowDeleteModal}
        />
      )}
      {activeView === "kanban" ? (
        <>
          <div className={styles.header}>{headerElements}</div>
          <KanbanDnd
            handleEditModal={handleEditModal}
            handleDeleteModal={handleDeleteModal}
            data={filterData.dataToDisplay}
          />
        </>
      ) : (
        <TaskListView
          handleEditModal={handleEditModal}
          handleDeleteModal={handleDeleteModal}
          data={filterData.dataToDisplay}
        />
      )}
    </div>
  );
};

export default Overview;
