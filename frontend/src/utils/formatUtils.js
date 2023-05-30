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


export const filterTasksByCycle = (cycles, tasks) =>  {
  const cycleValues = cycles.map(cycle => cycle.value);
  const filteredTasks = tasks.filter(task => cycleValues.includes(task.cycle?._id));
  return filteredTasks;
}