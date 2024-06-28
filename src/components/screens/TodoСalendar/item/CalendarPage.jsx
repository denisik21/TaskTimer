import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format, isBefore, startOfDay } from 'date-fns';
import TaskModal from './TaskModal';
import '../../../../index.css';

const CalendarPage = ({ todos, onEditTask, onDeleteTask }) => {
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDayClick = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const dayTasks = todos.filter(todo => todo.date === formattedDate);
        if (dayTasks.length > 0) {
            setSelectedTasks(dayTasks);
            setIsModalOpen(true);
        }
    };

    const getTileContent = ({ date, view }) => {
        const todayStart = startOfDay(new Date());
        
        if (view === 'month') {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const dayTasks = todos.filter(todo => todo.date === formattedDate);
            if (!isBefore(date, todayStart)) {
                if (dayTasks.length > 0) {
                    return (
                        <div className="relative">
                            <div className="dot">
                                {dayTasks.length}
                            </div>
                        </div>
                    );
                }
            }
        }
        return null;
    };

    return (
        <div className="calendar-container text-white">
            <Calendar
                tileContent={getTileContent}
                onClickDay={handleDayClick}
            />
            <TaskModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                tasks={selectedTasks}
                onEdit={(task) => {
                    onEditTask(task);
                    setSelectedTasks((prevTasks) =>
                        prevTasks.map((t) => (t.id === task.id ? { ...t, title: task.title } : t))
                    );
                }}
                onDelete={(taskId) => {
                    onDeleteTask(taskId);
                    setSelectedTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
                }}
            />
        </div>
    );
};

export default CalendarPage;
