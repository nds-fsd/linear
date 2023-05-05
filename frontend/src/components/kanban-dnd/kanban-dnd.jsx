
import {useState} from 'react'
import MOCK_DATA from './mock-data'
import Column from './column/column'
import { DragDropContext } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

const KanbanDnd = () => {
    // const [columns, setColumns] = useState(null);
    const [columns, setColumns] = useState(MOCK_DATA);


    const dragEndHandle = (result) =>{
        console.log(result)

         const { source, destination } = result;

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
              [source.droppableId]: widgets
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
              [destination.droppableId]: finishColumn
          };
          // se lo enchufamos al setState
          setColumns(updateState);
        }
    }

    // if(!columns) return null

  return (
   <DragDropContext onDragEnd={dragEndHandle}>
    <div style={{display:'flex', gap: '1rem'}}>
        {Object.keys(MOCK_DATA).map((column)=>(
            <Column key={column} droppableId={column} widgets={MOCK_DATA[column]}/>
        ))}
    </div>
   </DragDropContext>
  )
}

export default KanbanDnd