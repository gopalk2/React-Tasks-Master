import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

function Task() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function AddTask(event) {
    event.preventDefault();
    if (taskName.trim() !== '' && description.trim() !== '' && dueDate.trim() !== '') {
      const newTask = {
        taskName: taskName,
        description: description,
        dueDate: dueDate,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setTaskName('');
      setDescription('');
      setDueDate('');
    }
  }

  function deleteTask(index) {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  return (
    <>
      <div className='container'>
        <div className='header '>
          <h1>Task Details</h1>
          <div className='form-header' style={{ display: 'flex', justifyContent: 'center', background: 'orange' }}>
            <Form onSubmit={AddTask} style={{ width: '500px', background: '' }}>
              <Form.Group controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Task
              </Button>
            </Form>
          </div>
        </div>
        <div className='table-header' style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
          <h1>Task List</h1>
          <Table striped bordered hover>
            <thead>
              <tr style={{backgroundColor:'grey'}}>
                <th>Serial No.</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Delete/Confirm Task</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>
                    <input
                      type='checkbox'
                      checked={task.completed}
                      onChange={() => toggleComplete(index)}
                      style={{ marginRight: '10px' }}
                    />
                    <Button onClick={() => deleteTask(index)}>Delete Task</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Task;
