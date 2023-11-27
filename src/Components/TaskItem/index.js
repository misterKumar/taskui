
import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsMenuOpen(false); // Close the menu when editing
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`item ${isEditing && 'editing'}`}>
      <div className="task-header">
        <div className="menu-icon" onClick={handleMenuClick}>
          <FaEllipsisV />
        </div>
        {isMenuOpen && (
          <div className="menu">
            <div className="edit-option" onClick={handleEditClick}>
              Edit
            </div>
            <div className="delete-option" onClick={() => onDelete(task.id)}>
              Delete
            </div>
          </div>
        )}
      </div>
      <div className="task-content">
        <div className="task-name">{task.name}</div>
        <div className="timestamp">{task.timestamp}</div>
      </div>
      {isEditing ? (
        <div className="edit-form">
          <input type="text" value={task.name} onChange={(e) => onEdit(task.id, e.target.value)} />
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TaskItem;
