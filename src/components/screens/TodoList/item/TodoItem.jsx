import React from 'react'
import Check from './Check'
import cn from 'classnames'
import {BsTrash} from 'react-icons/bs'

const TodoItem = ({ todo, changeTodo, removeTodo }) => {
    return (
        <div className='flex items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full'>
            <button className='flex items-center' onClick={() => changeTodo(todo.id)}>
                <Check isCompleted={todo.isCompleted} />
                <div>
                    <span className={cn({
                        'line-through': todo.isCompleted
                    })}>{todo.title}</span>
                    <div className='text-sm text-gray-400'>
                        {todo.date} {todo.time}
                    </div>
                </div>
            </button>
            <button onClick={() => removeTodo(todo.id)}>
                <BsTrash size={22} className='text-gray-900 hover:text-pink-400 transition-colors ease-in-out duration-300'/>
            </button>
        </div>
    )
}

export default TodoItem