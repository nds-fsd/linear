import { useContext, useState } from "react";
import projectsStyle from "./projects.module.css";
import PageHeader from "../pageheader/pageheader";
import ProjectListView from "./projectlistview/projectlistview";
import { Context } from "../../Context";

const Projects = () => {
  const [activeView, setActiveview] = useState("list");
  const {teams} = useContext(Context)

  const projectList = teams.map(team => team.project)

  const handleEditModal = () =>{
    console.log("hola")
  }

  const handleDeleteModal = () =>{
    console.log("chau")
  }


  return (
    <div className={projectsStyle.projects}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="Projects"
        btntitle="Project"
      />
      <ProjectListView
        data={teams}
        handleEditModal={handleEditModal} 
        handleDeleteModal={handleDeleteModal}      
      />
    </div>
  );
};

export default Projects;
