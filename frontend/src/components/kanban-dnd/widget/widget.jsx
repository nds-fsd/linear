import React from 'react'
import styles from './widget.module.css'
import { Draggable } from 'react-beautiful-dnd'

const Widget = ({widget,index}) => {
  return (
    <Draggable draggableId={widget._id} index={index}>
      {(provided) => (
        <div
          className={styles.widget}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {widget.content}
        </div>
      )}
    </Draggable>
  )
}

export default Widget
