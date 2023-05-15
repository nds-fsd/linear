import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import headerStyle from "./pageheader.module.css"
import { Context } from "../../Context";

const PageHeader = ({
  setActiveview,
  activeView,
  title,
  btntitle,
  btnFunction,
}) => {

  const context = useContext(Context)
  const { userSessionContext } = context
  const today = new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const parts = today.split('/');
  const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.wrapper}>
        <h2>{formattedDate}</h2>
        <h1>{title}</h1>
        <h2>{userSessionContext?.team.title}</h2>
      </div>
      <div className={headerStyle.toolBar}>
        <div className={headerStyle.searchDialog}>
          <label htmlFor="searchinput">
            <SearchIcon className={headerStyle.icon} />
          </label>
          <input id="searchinput" type="text" placeholder="Search issues" />
        </div>

        <div className={headerStyle.switchViewBtnContainer}>
          <button
            onClick={() => setActiveview("kanban")}
            className={
              activeView === "kanban" ? headerStyle.activebtn : headerStyle.btn
            }
          >
            <ViewKanbanOutlinedIcon className={headerStyle.icon} />
            Board view
          </button>
          <button
            onClick={() => setActiveview("list")}
            className={
              activeView === "list" ? headerStyle.activebtn : headerStyle.btn
            }
          >
            <FormatListBulletedOutlinedIcon className={headerStyle.icon} />
            List view
          </button>
        </div>

        <button onClick={() => btnFunction(true)} className={headerStyle.btn}>
          <AddCircleOutlineOutlinedIcon />
          Add {btntitle}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
