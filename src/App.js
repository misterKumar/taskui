
import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import { v4 } from 'uuid';
import TaskItem from './Components/TaskItem';

const item = {
  id: v4(),
  name: 'Project 1',
  timestamp: new Date().toLocaleString(), // Add timestamp to the initial item
};

const item2 = {
  id: v4(),
  name: 'Complete the Project',
  timestamp: new Date().toLocaleString(), // Add timestamp to the initial item
};

function App() {
  const [text, setText] = useState('');
  const [state, setState] = useState({
    todo: {
      title: 'Yet To Start',
      items: [item, item2],
    },
    'not-yet-started': {
      title: 'Not Yet Started',
      items: [],
    },
    'in-progress': {
      title: 'In Progress',
      items: [],
    },
    done: {
      title: 'Completed',
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy);

      return prev;
    });
  };

  const addItem = () => {
    const newItem = {
      id: v4(),
      name: text,
      timestamp: new Date().toLocaleString(),
    };

    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: [newItem, ...prev.todo.items],
        },
      };
    });

    setText('');
  };

  const handleEdit = (taskId, newName) => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: prev.todo.items.map((item) =>
            item.id === taskId ? { ...item, name: newName } : item
          ),
        },
      };
    });
  };

  const handleDelete = (taskId) => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: 'Todo',
          items: prev.todo.items.filter((item) => item.id !== taskId),
        },
      };
    });
  };

  return (
    <div className="App">
      <div className="top">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <div className="bottom">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={'column'}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={'droppable-col'}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable key={el.id} index={index} draggableId={el.id}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${snapshot.isDragging && 'dragging'}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TaskItem
                                      task={el}
                                      onEdit={handleEdit}
                                      onDelete={handleDelete}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
