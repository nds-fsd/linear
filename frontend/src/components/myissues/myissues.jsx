import { useState } from "react";
import myIssuesStyle from "./myissues.module.css";
import PageHeader from '../pageheader/pageheader.jsx'
import KanbanDnd from "../kanban-dnd/kanban-dnd";
import AddTaskModal from "../addtaskmodal/addtaskmodal";

const MyIssues = () => {
  const [activeView, setActiveview] = useState("kanban");
  const [showModal, setShowModal] = useState(false)

  return (
    <div className={myIssuesStyle.myIssues}>
      <PageHeader
      activeView={activeView}
      setActiveview={setActiveview}
      title="My Issues"
      btntitle="Issue"
      btnFunction={setShowModal}
      />
      {showModal && <AddTaskModal closeModal={setShowModal}/>}
      <KanbanDnd />
    </div>
  );
};

export default MyIssues;
