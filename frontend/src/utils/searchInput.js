import { unorderTasks } from "./formatUtils"

export const handleSearch = (value, data)=>{
    if(!data || !value){return}
    const unorderedTasks = unorderTasks(data).filter(task => task.title.includes(value))
    return unorderedTasks
  }