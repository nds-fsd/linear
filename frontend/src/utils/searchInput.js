import { unorderTasks, sortTasksByStatus } from "./formatUtils"

export const handleSearch = (value, data)=>{
    if(!data || !value){return}
    const unorderedTasks = unorderTasks(data).filter(task => task.title.includes(value))
    console.log(unorderedTasks)
    return unorderedTasks
  }