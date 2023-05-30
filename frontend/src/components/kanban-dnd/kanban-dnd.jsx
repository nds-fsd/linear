import { useState, useEffect, useContext } from "react";
import Column from "./column/column";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./kanban-dnd.module.css";
import { patchTaskById, useEditStatusTaskMutation } from "../../utils/apitask";
import {Context} from '../../Context'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function modifyObjectProperty(arr, index, property, value) {
  const newArr = [...arr];
  if (index >= 0 && index < newArr.length) {
    newArr[index][property] = value;
  }
  return newArr;
}



const KanbanDnd = ({ data, handleEditModal, handleDeleteModal }) => {

  const {userSessionContext} = useContext(Context)
  const {id:userid, firstname, lastname} = userSessionContext

  const [columns, setColumns] = useState(data);
  const [taskForUpdate, setTaskForUpdate] = useState({
    draggableId: "",
    status: "",
  });

  const { mutate: updateTaskStatus, data:mutationData} = useEditStatusTaskMutation(
    taskForUpdate.draggableId,
    { status: taskForUpdate.status },
    {userid, username:`${firstname} ${lastname}`}
  );

  useEffect(() => {
    setColumns(data);
  }, [data]);


  useEffect(() => {
    if (taskForUpdate) {
      updateTaskStatus();
      
      const {status, draggableId} = taskForUpdate
      const indexOfCardInColumn = columns[status]?.findIndex(task => task._id === draggableId)
      const columnToModify = columns[status]
      if(columnToModify){
        const newColumn = modifyObjectProperty(columnToModify, indexOfCardInColumn,'status', status)
        setColumns({...columns, [status]:newColumn})
      }
      
    }
  }, [taskForUpdate]);

  const dragEndHandle = (result) => {
    const { source, destination, draggableId } = result;
    const newStatus = destination.droppableId;
    // si no tiene destino el evento, salte y no hagas nada
    if (!destination) {
      return;
    }
    // si el origen y el destino es el mismo.. verifica
    // si el indice es el mismo y no hagas nada
    // ------------------------------------------------
    // ! ESTE PRIMER IF ES PARA ORDENAR DENTRO DE LA MISMA COLUMNA
    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }
      const widgets = reorder(
        columns[source.droppableId],
        source.index,
        destination.index
      );
      const updateState = {
        ...columns,
        [source.droppableId]: widgets,
      };
      setColumns(updateState);
      // ! AQUI EN EL ELSE GESTIONAMOS EL CAMBIO DE COLUMNA
    } else {
      // hacemos una copia de la columna origen (utilizando el source del evento de dnd)
      const startColumn = [...columns[source.droppableId]];
      // hacemos una copia de la columna destino (utilizando el destination del evento de dnd)
      const finishColumn = [...columns[destination.droppableId]];
      // sacamos el widget de la columna donde estaba (por eso el splice es en startColumn)
      const [removed] = startColumn.splice(source.index, 1);
      // metemos el widget a la columna donde se soltó el widget (por eso el splice es en finishColumn)
      finishColumn.splice(destination.index, 0, removed);
      // reconstruimos un objeto y sobreescribimos el valor de las columnas que cambiamos
      const updateState = {
        ...columns,
        [source.droppableId]: startColumn,
        [destination.droppableId]: finishColumn,
      };
      setColumns(updateState);
      setTaskForUpdate({ draggableId, status: newStatus});
      // se lo enchufamos al setState
    }
  };

  // if(!columns) return null

  return (
    <DragDropContext onDragEnd={dragEndHandle}>
      <div className={styles.kanbanBoard}>
        {Object.keys(columns).map((column) => (
          <Column
            key={column}
            droppableId={column}
            widgets={columns[column]}
            handleEditModal={handleEditModal}
            handleDeleteModal={handleDeleteModal}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanDnd;
