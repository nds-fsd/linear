import { useState } from "react";
import DroppingArea from "./droppingarea/droppingarea";
import DraggableWidget from "./draggablewidget/draggablewidget";
import kanbanStyle from "./kanban.module.css";

function Kanban() {
  //   Hacer que pueda recibir un array con "estados" y generar una columna y un useState para cada uno
  //   con el objetivo de hacerlo más reutilizable

  const [groupOneWidgets, setGroupOneWidgets] = useState(["Jhon", "Talabot"]);
  const [groupTwoWidgets, setGroupTwoWidgets] = useState(["Indio", "Solari"]);
  const [groupThreeWidgets, setGroupThreeWidgets] = useState([
    "Peter",
    "Parker",
  ]);
  const [groupFourWidgets, setGroupFourWidgets] = useState(["Mick", "Jagger"]);

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
      <DroppingArea
        setWidgets={setGroupThreeWidgets}
        widgets={groupThreeWidgets}
      >
        {groupThreeWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupThreeWidgets}
            updateWidgetList={setGroupThreeWidgets}
            title={widget}
            key={index}
            index={index}
          />
        ))}
      </DroppingArea>
      <DroppingArea setWidgets={setGroupFourWidgets} widgets={groupFourWidgets}>
        {groupFourWidgets?.map((widget, index) => (
          <DraggableWidget
            widgetList={groupFourWidgets}
            updateWidgetList={setGroupFourWidgets}
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
