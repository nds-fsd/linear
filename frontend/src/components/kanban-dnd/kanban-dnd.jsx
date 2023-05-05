
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

        // const { source, destination } = result;

        // // si no tiene destino el evento, salte y no hagas nada
        // if (!destination) {
        //   return;
        // }
    
        // // si el origen y el destino es el mismo.. verifica
        // // si el indice es el mismo y no hagas nada
        // if (destination.droppableId === source.droppableId) {
        //   if (destination.index === source.index) {
        //     return;
        //   }
    
        //   const widgets = reorder(
        //     columns[source.droppableId],
        //     source.index,
        //     destination.index
        //   );
    
        //   const updateState = {
        //     widgets: {
        //       ...columns,
        //       [source.droppableId]: widgets
        //     }
        //   };
    
        //   setColumns(updateState);
        // } else {
        //   const startColumn = [...columns[source.droppableId]];
        //   const finishColumn = [...columns[destination.droppableId]];
        //   const [removed] = startColumn.splice(source.index, 1);
        //   finishColumn.splice(destination.index, 0, removed);
    
        //   const updateState = {
        //     widgets: {
        //       ...columns,
        //       [source.droppableId]: startColumn,
        //       [destination.droppableId]: finishColumn
        //     }
        //   };
        //   setColumns(updateState);
        // }
    }

    // if(!columns) return null

  return (
   <DragDropContext>
    <div style={{display:'flex', gap: '1rem'}}>
        {Object.keys(MOCK_DATA).map((column)=>(
            <Column key={column} droppableId={column} widgets={MOCK_DATA[column]}/>
        ))}
    </div>
   </DragDropContext>
  )
}

export default KanbanDnd