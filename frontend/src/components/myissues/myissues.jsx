import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getAllTasks } from "../../utils/apitask";
import myIssuesStyle from "./myissues.module.css";
import PageHeader from "../pageheader/pageheader.jsx";
import KanbanDnd from "../kanban-dnd/kanban-dnd";
import AddTaskModal from "../addtaskmodal/addtaskmodal";
import { Context } from "../../Context";

const MyIssues = () => {
  const [activeView, setActiveview] = useState("kanban");
  const [showModal, setShowModal] = useState(false);
  const context = useContext(Context)

  const {userSessionContext} = context
  const {id, firstname, lastname} = userSessionContext
  const userFullName =`${firstname} ${lastname}`

  console.log(userSessionContext)

  const { data: myTasks } = useQuery({
    queryKey: ["tasks", {userid:id, username: userFullName}],
    queryFn: () => getAllTasks({user:id}),
    onSuccess: (data) => {
      setColumns(data.data);
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
      data={myTasks?.data}
      />
    </div>
  );
};

export default MyIssues;
