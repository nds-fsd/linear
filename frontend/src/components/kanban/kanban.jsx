import { useState } from "react";
import DroppingArea from "./droppingarea/droppingarea";
import DraggableWidget from "./draggablewidget/draggablewidget";
import kanbanStyle from './kanban.module.css'

function Kanban() {


  const [groupOneWidgets, setGroupOneWidgets] = useState(["1","4"]);
  const [groupTwoWidgets, setGroupTwoWidgets] = useState(["2","3"]);
  
  return (
    <div className={kanbanStyle.kanbanArea}>
      <DroppingArea setWidgets={setGroupOneWidgets} widgets={groupOneWidgets}>
        {groupOneWidgets?.map((widget, index) => (
          <DraggableWidget 
          widgetList={groupOneWidgets}
          updateWidgetList={setGroupOneWidgets}
          title={widget} 
          key={index}
          index={index}
          />
        ))}
      </DroppingArea>

      <DroppingArea setWidgets={setGroupTwoWidgets} widgets={groupTwoWidgets}>
        {groupTwoWidgets?.map((widget, index) => (
          <DraggableWidget
          widgetList={groupTwoWidgets} 
          updateWidgetList={setGroupTwoWidgets}
          title={widget} 
          key={index} 
          index={index}
          />
        ))}
      </DroppingArea>
    </div>
  );
}

export default Kanban;