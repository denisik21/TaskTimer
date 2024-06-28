// src/components/screens/TodoList/CreateTodoField.jsx

import { useState } from 'react';
import { db, auth } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const CreateTodoField = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
  
    if (user) {
      try {
        const newTask = {
          title,
          date,
          time,
          isCompleted: false,
          userId: user.uid,
        };
  
        await addTodo(newTask); // Вызываем функцию addTodo с объектом новой задачи
        setTitle(''); // Очищаем поля формы
        setDate('');
        setTime('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      console.error('User is not authenticated');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between mb-4 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full mt-20'>
        <input className='bg-transparent border-none outline-none' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ваша задача" />
        <input className='bg-transparent border-none outline-none' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className='bg-transparent border-none outline-none' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <button className='border-2 rounded-lg border-pink-400 text-pink-400 pl-5 pr-5 pt-3 pb-3' type="submit">Add task</button>
    </form>
  );
};

export default CreateTodoField;
