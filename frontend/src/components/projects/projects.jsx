import { useState } from "react";
import projectsStyle from "./projects.module.css";
import PageHeader from "../pageheader/pageheader";
import Card from "../card/card.jsx";
const Projects = () => {
  const [activeView, setActiveview] = useState("list");

  return (
    <div className={projectsStyle.projects}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="Projects"
        btntitle="Project"
      />

      <Card />
    </div>
  );
};

export default Projects;
