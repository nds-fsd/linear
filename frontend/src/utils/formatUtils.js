export const formatDate = (inputDate) => {
  const dateToConvert = new Date(inputDate).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = dateToConvert.split("/");
  const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
  return formattedDate;
};


export const capitalizeStr = (str)=>{
  if(!str){return}
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1)
  return capitalizedStr
}


export const unorderTasks = (tasks)=>{
  const unorderedTasks = Object.keys(tasks)?.map((listName) => {
    return tasks[listName];
  });
  const rows = unorderedTasks?.reduce((acc, current) => {
    return [...acc, ...current];
  });

  return rows
}


export const sortTasksByStatus = (taskList) => {
    if(!taskList){return}
     const groupedTasks =  taskList.reduce(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    {
      backlog: [],
      todo: [],
      inprogress: [],
      done: [],
    }
  );
  return groupedTasks;
};

export const filterTasksByArray = (users, tasks, key) =>  {
  const userValues = users.map(user => user.value);
  const filteredTasks = tasks.filter(task => userValues.includes(task[key]?._id));
  return filteredTasks;
}


export const checkEmptyValues = (obj) =>{
 const listOfEmptyFields = Object.keys(obj).map(key => obj[key] === "" ? key : "").filter(key => key !== "")
 return listOfEmptyFields
 
}
