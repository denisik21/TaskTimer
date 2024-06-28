// src/components/screens/TodoList/TodoList.jsx

import React, { useState, useEffect } from 'react';
import { db, auth } from '../../../firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import TodoItem from './item/TodoItem';
import CreateTodoField from './create-todo-field/CreateTodoField';

const TodoList = () => {
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
  
    const changeTodo = async (id) => {
      const taskRef = doc(db, 'tasks', id);
      const currentTask = todos.find((t) => t.id === id);
      const updatedTask = { ...currentTask, isCompleted: !currentTask.isCompleted };
  
      try {
        await updateDoc(taskRef, { isCompleted: updatedTask.isCompleted });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? updatedTask : todo
          )
        );
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    };
  
    const removeTodo = async (id) => {
      try {
        await deleteDoc(doc(db, 'tasks', id));
        setTodos(todos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error('Error removing document: ', error);
      }
    };
  
    const addTodo = async (newTask) => {
        try {
          const docRef = await addDoc(collection(db, 'tasks'), newTask);
          const updatedTodos = [...todos, { ...newTask, id: docRef.id }];
          setTodos(updatedTodos);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      };
  
    return (
      <div className="text-white w-4/5 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-10">Какие планы?</h1>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} changeTodo={changeTodo} removeTodo={removeTodo} />
        ))}
        <CreateTodoField addTodo={addTodo} />
      </div>
    );
  };
  
  export default TodoList;
