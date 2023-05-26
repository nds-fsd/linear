import { getTaskById } from "../utils/apitask";
import { useQuery } from "react-query";




const { data: taskById } = useQuery({
    queryKey: ["task"],
    queryFn: () => getTasksByUser(id),
    onSuccess: (tasks) => {
      setData(tasks.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });  
