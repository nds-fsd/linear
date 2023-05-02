import {useEffect} from "react";
import { Routes, Route, redirect, Navigate, Outlet } from "react-router-dom";
import Sidebar from '../../components/sidebar/sidebar'
import MyIssues from "../../components/myissues/myissues";
import Projects from "../../components/projects/projects"
import Cycles from "../../components/cycles/cycles"
import Inbox from "../../components/inbox/inbox";
import Settings from "../../components/settings/settings";
import homeStyles from './home.module.css'
import {
  USER_ID,
  PROJECTS,
  MY_ISSUES,
  CYCLES,
  SETTINGS,
  INBOX,
  HOME
} from "../../route-path";

const Home = () => {


  useEffect(()=> {redirect(MY_ISSUES)}, [])


  return (
    <div className={homeStyles.home}>
      <Sidebar />
      <Routes>
          <Route path='' element={<Navigate to={MY_ISSUES}/>} />
          <Route path={MY_ISSUES} element={<MyIssues />} />
          <Route path={PROJECTS} element={<Projects />} />
          <Route path={CYCLES} element={<Cycles />} />
          <Route path={`${USER_ID}/${INBOX}`} element={<Inbox />} />
          <Route path={`${USER_ID}/${SETTINGS}`} element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Home;
