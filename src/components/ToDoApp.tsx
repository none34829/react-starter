import React, { useState, useEffect } from 'react';
import styles from '@/styles/ToDoApp.module.css';

interface Todo {
    id: string;
    task: string;
    dueDate: string;
    completed: boolean;
}

const ToDoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [taskInput, setTaskInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null);
    const [theme, setTheme] = useState('night');

    // grab todos from localStorage when we start
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        
        // get theme from localStorage too
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    // save to localStorage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (taskInput === '') {
            showAlertMessage('Please enter a task', 'error');
            return;
        }
        
        const newTodo: Todo = {
            id: getRandomId(),
            task: formatTask(taskInput),
            dueDate: formatDueDate(dateInput),
            completed: false
        };
        
        setTodos([...todos, newTodo]);
        setTaskInput('');
        setDateInput('');
        showAlertMessage('Task added successfully', 'success');
    };

    const handleDeleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
        showAlertMessage('Todo deleted successfully', 'success');
    };

    const handleEditTodo = (id: string) => {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            setTaskInput(todo.task);
            setTodos(todos.filter(todo => todo.id !== id));
            showAlertMessage('Task ready for editing', 'success');
        }
    };

    const handleToggleStatus = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleClearAllTodos = () => {
        setTodos([]);
        showAlertMessage('All todos cleared successfully', 'success');
    };

    const getRandomId = () => {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    };

    const formatTask = (task: string) => {
        return task.length > 14 ? task.slice(0, 14) + "..." : task;
    };

    const formatDueDate = (dueDate: string) => {
        return dueDate || "No due date";
    };

    const formatStatus = (completed: boolean) => {
        return completed ? "Completed" : "Pending";
    };

    const showAlertMessage = (message: string, type: string) => {
        setAlertMessage({ message, type });
        setTimeout(() => {
            setAlertMessage(null);
        }, 3000);
    };

    const changeTheme = (themeName: string) => {
        setTheme(themeName);
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);
    };

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'all':
                return true;
            case 'pending':
                return !todo.completed;
            case 'completed':
                return todo.completed;
            default:
        return true;
        }
    });

    const themes = [
        'cupcake', 'dark', 'light', 'bumblebee', 'synthwave',
        'halloween', 'fantasy', 'dracula', 'aqua', 'luxury', 'night'
    ];

    return (
        <>
            {/* theme picker thingy */}
            <div className="theme-switcher">
                <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn m-1">
                        <i className='bx bxs-palette bx-sm'></i>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {themes.map(themeName => (
                            <li key={themeName} className="theme-item" onClick={() => changeTheme(themeName)}>
                                <a>{themeName}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    
                    {/* popup msgs */}
                    <div className={`alert-message ${alertMessage ? 'show' : 'hide'}`}>
                        {alertMessage && (
                            <div className={`alert alert-${alertMessage.type} shadow-lg mb-5 w-full`}>
                                <div>
                                    <span>{alertMessage.message}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="input-section">
                        <input 
                            type="text" 
                            placeholder="Add a todo . . ." 
                            className="input input-bordered input-secondary w-full max-w-xs"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && taskInput.length > 0 && handleAddTodo()}
                        />
                        <input 
                            type="date" 
                            className="input input-bordered input-secondary w-full max-w-xs schedule-date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                        />
                        <button 
                            className="btn btn-secondary add-task-button"
                            onClick={handleAddTodo}
                        >
                            <i className="bx bx-plus bx-sm"></i>
                        </button>
                    </div>
                </header>

                <div className="todos-filter">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">Filter</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li onClick={() => setFilter('all')}><a>All</a></li>
                            <li onClick={() => setFilter('pending')}><a>Pending</a></li>
                            <li onClick={() => setFilter('completed')}><a>Completed</a></li>
                        </ul>
                    </div>
                    <button 
                        className="btn btn-secondary delete-all-btn"
                        onClick={handleClearAllTodos}
                    >
                        Delete All
                    </button>
                </div>

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="todos-list-body">
                        {filteredTodos.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">No task found</td>
                            </tr>
                        ) : (
                            filteredTodos.map((todo) => (
                                <tr key={todo.id} className="todo-item" data-id={todo.id}>
                                    <td>
                                        <span className={todo.completed ? "completed-task task-completed" : ""}>
                                            {todo.task}
                                        </span>
                                    </td>
                                    <td>{todo.dueDate}</td>
                                    <td>{formatStatus(todo.completed)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleEditTodo(todo.id)}
                                        >
                                            <i className="bx bx-edit-alt bx-bx-xs"></i>
                                        </button>
                                        <button 
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleToggleStatus(todo.id)}
                                        >
                                            <i className="bx bx-check bx-xs"></i>
                                        </button>
                                        <button 
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDeleteTodo(todo.id)}
                                        >
                                            <i className="bx bx-trash bx-xs"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* footer */}
            <footer>
                <div className="author-text">
                    <p>Made with ❤️ by <a href="https://github.com/none34829/" target="_blank" rel="noreferrer"><b>Ayush/none</b></a></p>
                </div>
            </footer>
        </>
    );
};

export default ToDoApp;