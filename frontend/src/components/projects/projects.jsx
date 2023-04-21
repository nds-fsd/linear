import {useState} from 'react'
import projectsStyle from './projects.module.css'
import PageHeader from '../pageheader/pageheader'

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

      projects
    </div>
  )
}

export default Projects