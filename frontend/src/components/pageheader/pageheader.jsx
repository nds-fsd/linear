import { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ListItemText from "@mui/material/ListItemText";
import MUISelect from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import headerStyle from "./pageheader.module.css";
import Select, { components } from "react-select";
import { Context } from "../../Context";
import {
  unorderTasks,
  sortTasksByStatus,
  filterTasksByArray
} from "../../utils/formatUtils";

const PageHeader = ({
  setActiveview,
  activeView,
  title,
  btntitle,
  btnFunction,
  refetchFn,
  filterData,
  setFilterData,
  setData,
  data,
}) => {
  const emptyOption = { label: "No option selected", id: "No options" };
  const context = useContext(Context);
  const { userSessionContext } = context;
  const [filterProjectOptions, setFilterProjectOptions] = useState([
    emptyOption,
  ]);

  useEffect(() => {
    if (filterData.type === "complex") {
      setFilterProjectOptions(() => {
        const projects = filterData?.teams?.map((team) => {
          return { label: team.project?.title, id: team.project?._id };
        });
        return [...projects];
      });
    }
  }, [filterData]);

  // console.log(filterData.selectedCycles)
  const today = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = today.split("/");
  const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

  const projectOptions = filterProjectOptions?.map((project) => {
    return { label: project.label, value: project.id };
  });

  const handleChange = (e) => {
    const selectedValues = e.target.value;
    const usersArray = filterData.selectedUsers
    const unorderedTasks = unorderTasks(data);
    const filteredTasks = filterTasksByArray(selectedValues, unorderedTasks, "cycle");
    const doubleFilter = filterTasksByArray(usersArray, filteredTasks,"asigneduser" )
    const sortedTasks = sortTasksByStatus(doubleFilter);
    setFilterData((prevState) => {
      return {
        ...prevState,
        selectedCycles: selectedValues,
        tasksFilteredByCycle:sortedTasks,
        dataToDisplay: sortedTasks,
      };
    });
  };

  const handleUserChange = (e) => {
    const selectedValues = e.target.value;
    const unorderedTasks = unorderTasks(filterData.tasksFilteredByCycle);
    const filteredTasks = filterTasksByArray(selectedValues, unorderedTasks, "asigneduser");
    const sortedTasks = sortTasksByStatus(filteredTasks);
    setFilterData((prevState) => {
      return {
        ...prevState,
        selectedUsers: selectedValues,
        dataToDisplay: sortedTasks,
      };
    });
  };


  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.wrapper}>
        <span></span>
        <div className={headerStyle.titleContainer}>
          <h1>{title}</h1>
          <p className={headerStyle.date}>{formattedDate}</p>
        </div>
        <span></span>
      </div>
      <div className={headerStyle.toolBar}>
        <div className={headerStyle.filterWrapper}>
          {filterData.type === "complex" ? (
            <>
              {/* PROJECTS */}
              <Select
                value={filterData.selectedProject}
                onChange={(value) => {
                  const selectedTeam = filterData.teams.find(
                    (team) => team.project._id === value.value
                  );
                  const usersWithLabel = selectedTeam.users.map(user =>{
                    return{label:user.firstname ,value:user._id}
                  })
                  setFilterData((prevState) => {
                    return {
                      ...prevState,
                      selectedProject: value,
                      users: usersWithLabel,
                      selectedUsers: usersWithLabel,
                    };
                  });
                  refetchFn();
                }}
                classNames={{ control: () => headerStyle.select }}
                options={projectOptions}
              />
              {/* CYCLES */}
              <MUISelect
                sx={{
                  display: "flex",
                  gap: "0.5em",
                  borderRadius: "6px",
                  height: "50px",
                  width: "200px",
                  backgroundColor: "white",
                  flexWrap: "wrap",
                }}
                name="cycles"
                multiple
                value={filterData.selectedCycles}
                onChange={handleChange}
                renderValue={(selected) =>
                  selected.map((option) => option.label).join(" | ")
                }
              >
                {filterData.cycles?.map((cycle) => {
                  return (
                    <MenuItem key={cycle.value} value={cycle}>
                      <Checkbox
                        checked={filterData.selectedCycles.indexOf(cycle) > -1}
                      />
                      <ListItemText primary={cycle.label} />
                    </MenuItem>
                  );
                })}
              </MUISelect>
              <MUISelect
                sx={{
                  display: "flex",
                  gap: "0.5em",
                  borderRadius: "6px",
                  height: "50px",
                  width: "200px",
                  backgroundColor: "white",
                  flexWrap: "wrap",
                }}
                name="users"
                multiple
                value={filterData.selectedUsers}
                onChange={handleUserChange}
                renderValue={(selected) =>
                  selected.map((option) => option.label).join(" | ")
                }
              >
                {filterData.users?.map((user) => {
                  return (
                    <MenuItem key={user.value} value={user}>
                      <Checkbox
                        checked={filterData.selectedUsers.indexOf(user) > -1}
                      />
                      <ListItemText primary={user.label} />
                    </MenuItem>
                  );
                })}
              </MUISelect>
            </>
          ) : (
            <div className={headerStyle.searchDialog}>
              <label htmlFor="searchinput">
                <SearchIcon className={headerStyle.icon} />
              </label>
              <input
                id="searchinput"
                type="text"
                placeholder="Search an issue"
              />
            </div>
          )}
        </div>
        {title !== "Projects" && (
          <div className={headerStyle.switchViewBtnContainer}>
            <button
              onClick={() => {
                if (filterData.type === "complex") {
                  const unorderedTasks = unorderTasks(filterData.dataToDisplay);
                  const sortedTasks = sortTasksByStatus(unorderedTasks);
                  setFilterData((prevState) => {
                    return { ...prevState, dataToDisplay: sortedTasks };
                  });
                } else if (filterData.type === "simple") {
                  refetchFn();
                }
                setActiveview("kanban");
              }}
              className={
                activeView === "kanban"
                  ? headerStyle.activebtn
                  : headerStyle.btn
              }
            >
              <ViewKanbanOutlinedIcon className={headerStyle.icon} />
              Board view
            </button>
            <button
              onClick={() => {
                if (filterData.type === "simple") {
                  refetchFn();
                }
                setActiveview("list");
              }}
              className={
                activeView === "list" ? headerStyle.activebtn : headerStyle.btn
              }
            >
              <FormatListBulletedOutlinedIcon className={headerStyle.icon} />
              List view
            </button>
          </div>
        )}
        {filterData.type === "complex" && <span></span>}

        <button onClick={() => btnFunction(true)} className={headerStyle.btn}>
          <AddCircleOutlineOutlinedIcon />
          Add {btntitle}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
