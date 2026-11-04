import React from 'react';
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import { useTasks } from '../../context/TaskContext';
import './Home.css';

function Home() {
  // Panggil context langsung tanpa menerima props dari App!
  const { tasks, addTask, deleteTask, toggleComplete, stats } = useTasks();

  return (
    <div className="home">
      <Header title="React Task Manager" description="State Global dengan Context API" />
      <main className="container">
        <div className="stats">
          <p>Total: {stats.total}</p>
          <p>Selesai: {stats.completed}</p>
          <p>Progress: {stats.completionRate.toFixed(0)}%</p>
        </div>
        <TaskForm onAddTask={addTask} />
        <div className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggleComplete={toggleComplete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;