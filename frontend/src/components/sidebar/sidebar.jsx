import { useContext, useEffect } from "react";
import { getUserSession, removeSession } from "../../utils/localStorage.utils";
import UserDatacard from "../userdatacard/userdatacard";
import { NavLink, useNavigate } from "react-router-dom";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import {
  HOME,
  USERS,
  USER_ID,
  PROJECTS,
  MY_ISSUES,
  CYCLES,
  SETTINGS,
  INBOX,
  LOGIN,
} from "../../route-path";
import { Context } from "../../Context";
import sideBarStyles from "./sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const { notificationData, userSessionContext, SOCKET } = useContext(Context);
  const { id: userid } = userSessionContext;

  const unreadNotifications = notificationData?.data.filter(
    (notification) => !notification.seen
  ).length;

  useEffect(() => {
    if (SOCKET) {
      SOCKET.connect();
      SOCKET.on("connection", (data) => {
        console.log("Connected");
      });
      return () => {
        SOCKET.disconnect();
      };
    }
  }, [SOCKET]);

  useEffect(() => {
    const recievedInvitation = (newInvitation) => {
      console.log('NEW INVITATION',newInvitation)
      // aqui va la de set notification
    };

    if(SOCKET){
      SOCKET.on('new-invitation',recievedInvitation)
    }
  },[SOCKET])

  return (
    <div className={sideBarStyles.sidebarContainer}>
      <UserDatacard />

      <nav className={sideBarStyles.navBar}>
        <ul className={sideBarStyles.list}>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={MY_ISSUES}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid var(--accent-color)" : "",
                  color: isActive ? "var(--accent-color)" : "",
                };
              }}
            >
              <ListAltOutlinedIcon className={sideBarStyles.icon} />
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
                  borderBottom: isActive ? "2px solid var(--accent-color)" : "",
                  color: isActive ? "var(--accent-color)" : "",
                };
              }}
            >
              <AssignmentOutlinedIcon className={sideBarStyles.icon} />
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
                  borderBottom: isActive ? "2px solid var(--accent-color)" : "",
                  color: isActive ? "var(--accent-color)" : "",
                };
              }}
            >
              <AnalyticsOutlinedIcon className={sideBarStyles.icon} />
              Overview
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={`${INBOX}`}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid var(--accent-color)" : "",
                  color: isActive ? "var(--accent-color)" : "",
                };
              }}
            >
              <InboxOutlinedIcon className={sideBarStyles.icon} />
              {unreadNotifications !== 0 && (
                <span className={sideBarStyles.notificationsMark}>
                  {unreadNotifications}
                </span>
              )}
              Inbox
            </NavLink>
          </li>
          <li className={sideBarStyles.listItem}>
            <NavLink
              to={`${userid}/${SETTINGS}`}
              className={sideBarStyles.link}
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid var(--accent-color)" : "",
                  color: isActive ? "var(--accent-color)" : "",
                };
              }}
            >
              <SettingsOutlinedIcon className={sideBarStyles.icon} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        onClick={() => {
          removeSession();
          navigate(LOGIN);
        }}
        className={sideBarStyles.logOut}
      >
        <div className={sideBarStyles.link}>
          <LogoutOutlinedIcon className={sideBarStyles.icon} />
          Log out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
