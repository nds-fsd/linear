import { useState } from "react";
import myIssuesStyle from "./myissues.module.css";
import PageHeader from '../pageheader/pageheader.jsx'
import Kanban from "../kanban/kanban"
import KanbanDnd from "../kanban-dnd/kanban-dnd";

const MyIssues = () => {
  const [activeView, setActiveview] = useState("kanban");

  return (
    <div className={myIssuesStyle.myIssues}>
      <PageHeader
      activeView={activeView}
      setActiveview={setActiveview}
      title="My Issues"
      btntitle="Issue"
      />
      {/* <Kanban/> */}
      <KanbanDnd />
    </div>
  );
};

export default MyIssues;
