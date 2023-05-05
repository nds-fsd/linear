import { memo } from "react";
import { Droppable } from 'react-beautiful-dnd';
import Widget from '../widget/widget';


const WidgetList = memo(function WidgetList({ widgets }) {
    return widgets.map((widget, index) => (
      <Widget widget={widget} index={index} key={widget.id} />
    ));
  });
  

const Column = ({ droppableId, widgets }) => {
  
  return (
   <Droppable droppableId={droppableId}>
    {(provided) => (
        <div style={{width:'300px', border: '2px solid blue', padding: '0.5rem', borderRadius: '0.5rem'}} ref={provided.innerRef} {...provided.droppableProps}>
         <h1>{droppableId}</h1>
         <WidgetList widgets={widgets}/>
         {provided.placeholder}
        </div>
      )}
   </Droppable>
  );
};

export default Column;
