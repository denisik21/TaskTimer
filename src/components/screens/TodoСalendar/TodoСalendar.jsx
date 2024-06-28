import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import CalendarPage from './item/CalendarPage';

const TodoCalendar = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const tasksData = [];
                    querySnapshot.forEach((doc) => {
                        tasksData.push({ ...doc.data(), id: doc.id });
                    });
                    setTodos(tasksData);
                });

                return () => unsubscribe();
            }
        };

        fetchData();
    }, []);

    const handleEditTask = async (task) => {
        const taskDoc = doc(db, 'tasks', task.id);
        await updateDoc(taskDoc, { title: task.title });
        setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === task.id ? { ...t, title: task.title } : t))
        );
    };

    const handleDeleteTask = async (taskId) => {
        const taskDoc = doc(db, 'tasks', taskId);
        await deleteDoc(taskDoc);
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== taskId));
    };

    return (
        <div className="mx-auto">
            <h1 className="text-white text-2xl font-bold text-center mb-10">Календарь текущих дел</h1>
            <CalendarPage 
                todos={todos} 
                onEditTask={handleEditTask} 
                onDeleteTask={handleDeleteTask} 
            />
        </div>
    );
};

export default TodoCalendar;
