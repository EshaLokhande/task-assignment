import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const API = "http://localhost:5000/api/v1";

  // REGISTER
  const handleRegister = async () => {
    await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    alert("Registered! Now login");
    setPage("login");
  };

  // LOGIN
  const handleLogin = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setPage("dashboard");
  };

  // GET TASKS
  const getTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  // ADD TASK
  const addTask = async () => {
    await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    getTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My App</h2>

      {/* REGISTER */}
      {page === "register" && (
        <>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <br />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleRegister}>Register</button>
          <p onClick={() => setPage("login")}>Go to Login</p>
        </>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>Login</button>
          <p onClick={() => setPage("register")}>Go to Register</p>
        </>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && (
        <>
          <button onClick={getTasks}>Load Tasks</button>
          <br />
          <br />

          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>

          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                {task.title}
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
