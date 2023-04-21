import SearchIcon from "@mui/icons-material/Search";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import headerStyle from "./pageheader.module.css";

const PageHeader = ({ setActiveview, activeView, title, btntitle }) => {
  return (
    <div className={headerStyle.header}>
      <h1>{title}</h1>

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

        <button className={headerStyle.btn}>
          <AddCircleOutlineOutlinedIcon />
          Add {btntitle}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
