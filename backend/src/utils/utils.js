const sortTasksByStatus = (taskList) => {
  const tasksWithoutUserPasswords = taskList.map((task) => {
    const { _id, title, description, status, duedate, user, cycle } = task;
    const { firstname, lastname, teamrole, email } = user;
    const asigneduser = {
      firstname,
      lastname,
      teamrole,
      email,
      _id: user._id,
    };
    const taskWithoutUserPassword = {
      _id,
      title,
      description,
      status,
      duedate,
      asigneduser,
      cycle,
    };
    return taskWithoutUserPassword;
  });
  const groupedTasks = tasksWithoutUserPasswords.reduce(
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

module.exports = { sortTasksByStatus };
