import {useEffect} from "react";
import { Routes, Route, Outlet, Navigate, redirect } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar'
import MyIssues from "../../components/myissues/myissues";
import Projects from "../../components/projects/projects"
import Cycles from "../../components/cycles/cycles"
import Inbox from "../../components/inbox/inbox";
import Settings from "../../components/settings/settings";
import homeStyles from './home.module.css'
import {
  HOME,
  USERS,
  USER_ID,
  PROJECTS,
  MY_ISSUES,
  CYCLES,
  SETTINGS,
  INBOX
} from "../../route-path";

const Home = () => {
  
  
  useEffect(()=> {redirect(MY_ISSUES)}, [])


  return (
    <div className={homeStyles.home}>
      <Sidebar />      
      <Routes>
        <Route path={HOME} element={<Outlet />}>        
              <Route path={HOME} element={<Navigate to={MY_ISSUES}/>} />
              <Route path={MY_ISSUES} element={<MyIssues />} />
              <Route path={PROJECTS} element={<Projects />} />
              <Route path={CYCLES} element={<Cycles />} />   
              <Route path={`${USER_ID}/${INBOX}`} element={<Inbox />} />
              <Route path={`${USER_ID}/${SETTINGS}`} element={<Settings />} />     
        </Route>
      </Routes>
    </div>
  );
};

export default Home;
