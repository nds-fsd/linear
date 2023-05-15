import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllTasks, getTasksByUser } from "../../utils/apitask";
import myIssuesStyle from "./myissues.module.css";
import PageHeader from "../pageheader/pageheader.jsx";
import KanbanDnd from "../kanban-dnd/kanban-dnd";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import { Context } from "../../Context";
import MOCK_DATA from "../kanban-dnd/mock-data"

const MyIssues = () => {
  const [activeView, setActiveview] = useState("kanban");
  const [showModal, setShowModal] = useState(false);
  const {userSessionContext:{id, firstname, lastname}} = useContext(Context)
  const [data, setData] = useState(MOCK_DATA);   
  const userFullName =`${firstname} ${lastname}`
  
  const { data: myTasks } = useQuery({
    queryKey: ["tasks", {userid:id, username: userFullName}],
    queryFn: () => getTasksByUser(id),
    onSuccess: (tasks) => {
      setData(tasks.data);
    },
    onError: (err) => {console.log(err)},
  });
  
  return (
    <div className={myIssuesStyle.myIssues}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="My Issues"
        btntitle="Issue"
        btnFunction={setShowModal}
      />
      {showModal && <AddTaskModal closeModal={setShowModal} />}
      <KanbanDnd
      data={data}
      />
    </div>
  );
};

export default MyIssues;
