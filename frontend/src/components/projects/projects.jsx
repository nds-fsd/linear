import { useContext, useState } from "react";
import projectsStyle from "./projects.module.css";
import PageHeader from "../pageheader/pageheader";
import ProjectListView from "./projectlistview/projectlistview";
import { Context } from "../../Context";
import AddProjectModal from "./addprojectmodal/addprojectmodal";

const Projects = () => {
  const [activeView, setActiveview] = useState("list");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const { teams, userSessionContext } = useContext(Context);
  const {id} = userSessionContext

  const handleEditModal = () => {
    console.log("hola");
  };

  const handleDeleteModal = () => {
    console.log("chau");
  };

  const handleAddProjectModal = () => {
    setShowAddProjectModal(true);
  };
  
const filteredTeams = teams.filter(team => {
  const userIdsArray = team.users?.map(user=> user._id)
  return userIdsArray?.includes(id)
})








  const filterData = { type: "simple" };
  return (
    <div className={projectsStyle.projects}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="Projects"
        btntitle="Project"
        filterData={filterData}
        btnFunction={handleAddProjectModal}
      />
      <ProjectListView
        data={filteredTeams}
        handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
      />
      {showAddProjectModal && (
        <AddProjectModal setShowModal={setShowAddProjectModal} />
      )}
    </div>
  );
};

export default Projects;
