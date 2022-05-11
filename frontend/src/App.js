import './App.css';
import Table from 'react-bootstrap/Table'
import {useState} from "react";
import axios from "axios";


function App() {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})

    const fetchUsers = async () => {
        const response = await axios.get(`http://localhost:8000/users`)
        console.log(response.data)
        setUsers(response.data)
    }
    const fetchUser = async (id) => {
        const response = await axios.get(`http://localhost:8000/users/${id}`).then()
        setUser(response.data)
    }
    const createUser = async (e) => {
        e.preventDefault()
        console.log(user)
        await axios.post('http://localhost:8000/users', user)
        await fetchUsers()
        await setUser({id: 0, name: '', email: '', password: ''})
    }

    const updateUser = async (id) => {
        await axios.put(`http://localhost:8000/users/${id}`, user)
        await fetchUsers()
        await setUser({id: 0, name: '', email: '', password: ''})
    }
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8000/users/${id}`)
        await fetchUsers()
    }


    return (
        // <div className="App">
        //   <header className="App-header">
        //     <img src={logo} className="App-logo" alt="logo" />
        //     <p>
        //       Edit <code>src/App.js</code> and save to reload.
        //     </p>
        //     <a
        //       className="App-link"
        //       href="https://reactjs.org"
        //       target="_blank"
        //       rel="noopener noreferrer"
        //     >
        //       Learn React
        //     </a>
        //   </header>
        // </div>
        <div className="App" style={{border: '2px solid red'}}>
            <div className="cm-header-1">
                <h1>User Management App</h1>
            </div>
            <div className="form">
                <form onSubmit={(e) => createUser(e)} style={{padding: 20, margin: 20}}>
                    <label style={{margin: 20}} className="input-lg">
                        Name:
                        <input value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} type="text"
                               name="name"/>
                    </label>

                    <label style={{margin: 20}}>
                        Email:
                        <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}
                               type="email" name="email"/>
                    </label>

                    <label style={{margin: 20}}>
                        Password:
                        <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}
                               type="password"
                               name="password"/>
                    </label>
                    <br/>
                    <div style={{margin: 20, background: 'primary'}}>
                        <input type="submit" value="Add User"/>
                    </div>
                </form>
            </div>
            <div className="table-responsive">
                <Table responsive striped bordered variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((row) => (
                            <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.password}</td>
                                <div style={{margin: 20, background: 'primary'}}>
                                    <input onClick={() => updateUser(row.id)} type="submit"
                                           value="Update User"/>
                                </div>
                                <div style={{margin: 20, background: 'primary'}}>
                                    <input onClick={() => deleteUser(row.id)} type="submit" value="Delete User"/>
                                </div>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default App;
