import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../../../index.css';
import { GoX } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import {BsTrash} from 'react-icons/bs'
import {BsCheck} from 'react-icons/bs'

const TaskModal = ({ isOpen, onRequestClose, tasks, onEdit, onDelete }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');

    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditTaskTitle(task.title);
    };

    const handleSaveClick = (task) => {
        onEdit({ ...task, title: editTaskTitle });
        setEditTaskId(null);
        setEditTaskTitle('');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Task Details"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2 className="text-xl font-bold mb-4">Задачи</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className="mb-2">
                        {editTaskId === task.id ? (
                            <input
                                type="text"
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                                className="text-lg font-semibold rounded"
                            />
                        ) : (
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                        )}
                        <p>{task.time}</p>
                        {editTaskId === task.id ? (
                            <button
                                onClick={() => handleSaveClick(task)}
                                className="mr-2 bg-green-400 text-white p-2 rounded-lg"
                            >
                                <BsCheck />
                            </button>
                        ) : (
                            <button
                                onClick={() => handleEditClick(task)}
                                className="mr-2 bg-blue-400 text-white p-2 rounded-lg"
                            >
                                <GoPencil />
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(task.id)}
                            className="bg-red-400 text-white p-2 rounded-lg"
                        >
                            <BsTrash />
                        </button>
                    </li>
                ))}
            </ul>
            <button
                onClick={onRequestClose}
                className="absolute top-3 right-3"
            >
                <GoX className="h-7 w-7"/>
            </button>
        </Modal>
    );
};

export default TaskModal;
