import { useContext, useState, useEffect } from "react";
import projectsStyle from "./projects.module.css";
import PageHeader from "../pageheader/pageheader";
import ProjectListView from "./projectlistview/projectlistview";
import { Context } from "../../Context";
import AddProjectModal from "./addprojectmodal/addprojectmodal";
import { deleteProjectById } from "../../utils/apiProject";
import DeleteModal from "../confirmdeletemodal/confirmdeletemodal";

const Projects = () => {
  const { teams, userSessionContext } = useContext(Context);
  const { id } = userSessionContext;

  const initialData = teams.filter((team) => {
    const userIdsArray = team.users?.map((user) => user._id);
    return userIdsArray?.includes(id);
  });

  const [activeView, setActiveview] = useState("list");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [searchbarFilter, setSearchbarFilter] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(initialData);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  //this is for passing default values to the add project modal on editmode
  const [selectedProject, setSelectedProject] = useState({});
  const [modalType, setModalType] = useState("");

  const handleEditModal = (data) => {
    setModalType("edit");
    setSelectedProject(data);
    setShowAddProjectModal(true);
  };

  const handleDeleteModal = (teamid) => {
    setModalType("deleteproject");
    setSelectedTeamId(teamid);
    setShowDeleteProjectModal(true)
  };

  const handleAddProjectModal = () => {
    setModalType("add");
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
          modalType={modalType}
          selectedProject={selectedProject}
          setShowModal={setShowAddProjectModal}
          setSelectedProject={setSelectedProject}
        />
      )}
      {showDeleteProjectModal && <DeleteModal 
      deletedSchema={"Project"}
      cancelFn={setShowDeleteProjectModal}
      modalType={modalType} 
      teamId={selectedTeamId}
      
      />}
    </div>
  );
};

export default Projects;
