import React from "react";
import { NavLink } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  HOME,
  USERS,
  USER_ID,
  PROJECTS,
  MY_ISSUES,
  CYCLES,
  SETTINGS,
  INBOX,
} from "../../route-path";
import sideBarStyles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={sideBarStyles.sidebarContainer}>
      <div className={sideBarStyles.userData}>UserData</div>
      <nav className={sideBarStyles.navBar}>
        <ul className={sideBarStyles.list}>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={MY_ISSUES}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                };
              }}
            >
              <ListAltOutlinedIcon />
              My issues
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={PROJECTS}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                };
              }}
            >
              <AssignmentOutlinedIcon />
              Projects
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={CYCLES}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                };
              }}
            >
              <QueryBuilderOutlinedIcon />
              Cycles
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={`${USER_ID}/${INBOX}`}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                };
              }}
            >
              <InboxOutlinedIcon />
              Inbox
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={`${USER_ID}/${SETTINGS}`}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid black" : "",
                };
              }}
            >
              <SettingsOutlinedIcon />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={sideBarStyles.logOut}>
        <div className={sideBarStyles.link}>
          <LogoutOutlinedIcon />
          Log out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
