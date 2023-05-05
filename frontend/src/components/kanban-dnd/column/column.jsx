import { useState,memo } from "react";
import droppingAreaStyle from './column.module.css'
import {Droppable} from 'react-beautiful-dnd'
import Widget from '../widget/widget'


const Column = ({ droppableId, widgets }) => {
  
  return (
   <Droppable droppableId={droppableId}>
    {(provided) => (
        <div style={{width:'300px', border: '2px solid blue', padding: '0.5rem', borderRadius: '0.5rem'}} ref={provided.innerRef} {...provided.droppableProps}>
         <h1>{droppableId}</h1>
         {widgets.map((widget,idx)=>(
          <Widget key={widget.id} widget={widget} index={idx} />
         ))}
        </div>
      )}
   </Droppable>
  );
};

export default Column;
