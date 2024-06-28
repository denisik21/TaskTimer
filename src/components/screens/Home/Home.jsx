import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Home = () => {
    const [tasks, setTasks] = useState([]);

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
                    setTasks(tasksData);
                });

                return () => unsubscribe();
            }
        };

        fetchData();
    }, []);

    const tasksThisWeek = tasks.filter(task => {
        const today = new Date();
        const taskDate = new Date(task.date);
        const diffTime = Math.abs(taskDate - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && taskDate >= today;
    });

    const tasksToday = tasks.filter(task => task.date === new Date().toISOString().split('T')[0]);
    console.log(new Date().toISOString().split('T')[0]);
    console.log(new Date().toISOString());
    const completedTasksToday = tasks.filter(task => task.isCompleted && task.date === new Date().toISOString().split('T')[0]);
    const completedTasks = tasks.filter(task => task.isCompleted);
    const upcomingTasks = tasks.filter(task => !task.isCompleted && !tasksThisWeek.includes(task) && !tasksToday.includes(task));
    const overdueTasks = tasks.filter(task => new Date(task.date) < new Date() && !task.isCompleted);

    const renderTasks = (tasks) => (
        <ul className="text-left mt-2">
            {tasks.map(task => (
                <li key={task.id} className="text-lg">
                    {task.title}
                </li>
            ))}
        </ul>
    );

    const renderTasksWithDates = (tasks) => (
        <ul className="text-left mt-2">
            {tasks.map(task => (
                <li key={task.id} className="text-lg flex justify-around">
                    <span className='w-2/3'>{task.title}</span>
                    <span className="text-pink-400">
                        {new Date(task.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}
                    </span>
                </li>
            ))}
        </ul>
    );

    const progressData = {
        labels: ['Выполненные', 'Осталось'],
        datasets: [{
            data: [completedTasksToday.length, tasksToday.length - completedTasksToday.length],
            backgroundColor: ['#4CAF50', '#FF6384'],
            hoverBackgroundColor: ['#66BB6A', '#FF6384']
        }]
    };

    const labels = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Увеличиваем дату на i дней
        labels.push(date.getDate()); // Используем число дня
    }

    const weeklyTaskData = {
        labels: labels,
        datasets: [
            {
                label: 'Количество задач на неделю по дням',
                backgroundColor: '#ec4899',
                borderColor: '#9d174d',
                borderWidth: 1,
                hoverBackgroundColor: '#f472b6',
                hoverBorderColor: '#f472b6',
                data: []
            }
        ]
    };

    labels.forEach(day => {
        const dayTasks = tasksThisWeek.filter(task => new Date(task.date).getDate() === day);
        weeklyTaskData.datasets[0].data.push(dayTasks.length);
    });

    return (
        <div className="dashboard text-white w-4/5 mx-auto">
            <h2 className="text-2xl font-bold mb-10 text-center">Домашняя страница</h2>
            <div className="flex">
                <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-1/2 text-center">
                    <h3 className="text-xl mb-2">Задачи на сегодняшний день</h3>
                    <p className="text-3xl text-pink-400">{tasksToday.length}</p>
                    <div className='flex justify-around'>
                        {renderTasks(tasksToday)}
                        {/* <p className="text-3xl">{completedTasksToday.length}</p> */}
                        <div className="w-48 h-48">
                            <Pie data={progressData} />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-800 ml-10 p-4 rounded-lg shadow-lg w-1/3 text-center">
                    <h3 className="text-xl mb-2">Задачи на неделю</h3>
                    {renderTasksWithDates(tasksThisWeek)}
                </div>
            </div>
            <div className='flex'>
                <div className='mt-10 flex w-1/2'>
                    <div className='w-1/2'>
                        <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-center">
                            <h3 className="text-xl mb-2">Выполненные задачи</h3>
                            <p className="text-3xl text-pink-400">{completedTasks.length}</p>
                            {renderTasks(completedTasks)}
                        </div>
                            
                        <div className="bg-zinc-800 p-4 rounded-lg shadow-lg text-center mt-10">
                            <h3 className="text-xl mb-2">Просроченные задачи</h3>
                            <p className="text-3xl">{overdueTasks.length}</p>
                            {renderTasks(overdueTasks)}
                        </div>
                    </div>

                    <div className="bg-zinc-800 p-4 rounded-lg shadow-lg w-1/2 text-center ml-10">
                        <h3 className="text-xl mb-2">Предстоящие задачи</h3>
                        <p className="text-3xl">{upcomingTasks.length}</p>
                        {renderTasksWithDates(upcomingTasks)}
                    </div>
                </div>
                <div className='w-1/3 ml-10 mt-24'>
                <Bar data={weeklyTaskData} />
                </div>
            </div>
        </div>
    );
};

export default Home;
