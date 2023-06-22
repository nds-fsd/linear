import { useContext, useState, useEffect } from "react";
import projectsStyle from "./projects.module.css";
import PageHeader from "../pageheader/pageheader";
import ProjectListView from "./projectlistview/projectlistview";
import { Context } from "../../Context";
import AddProjectModal from "./addprojectmodal/addprojectmodal";
import { handleSearch } from "../../utils/searchInput";
import { useEditProjectMutation } from "../../utils/apiProject";

const Projects = () => {
  const { teams, userSessionContext } = useContext(Context);
  const { id } = userSessionContext;

  const initialData = teams.filter((team) => {
    const userIdsArray = team.users?.map((user) => user._id);
    return userIdsArray?.includes(id);
  });

  const [activeView, setActiveview] = useState("list");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [searchbarFilter, setSearchbarFilter] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(initialData);
  const [selectedProject, setSelectedProject] = useState("")
  const [objToSend, setObjToSend] = useState({})

  const handleEditModal = (projectId) => {
    setSelectedProject(projectId)
    setShowAddProjectModal(true)
  };

  const handleDeleteModal = () => {
    console.log("chau");
  };

  const handleAddProjectModal = () => {
    setShowAddProjectModal(true);
  };

  const handleSearch = (value, data) => {
    if (!data || !value) {
      return;
    }
    const projects = initialData.filter((team) => team.title.includes(value));
    return projects;
  };

  useEffect(() => {
    setFilteredTeams(initialData);

    if (searchbarFilter) {
      setFilteredTeams((prevState) => {
        const filteredProjects = handleSearch(searchbarFilter, initialData);
        if (filteredProjects.length === 0) {
          return [];
        } else {
          return filteredProjects;
        }
      });
    }
  }, [teams, searchbarFilter]);
  const filterData = { type: "simple" };

  const {mutate, data, isLoading, isError, error} = useEditProjectMutation(selectedProject, objToSend)


  return (
    <div className={projectsStyle.projects}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="Projects"
        btntitle="Project"
        filterData={filterData}
        btnFunction={handleAddProjectModal}
        setSearchbarFilter={setSearchbarFilter}
      />
      <ProjectListView
        data={filteredTeams}
        handleEditModal={handleEditModal}
        handleDeleteModal={handleDeleteModal}
      />
      {showAddProjectModal && (
        <AddProjectModal 
        selectedProject={selectedProject}
        setShowModal={setShowAddProjectModal} />
      )}
    </div>
  );
};

export default Projects;
