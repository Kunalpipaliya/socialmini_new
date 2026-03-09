import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Home from './Pages/Home';
import Header from './Component/Header';
import Post from './Pages/Post';
import Navbar from './Component/Navbar';
import Profile from './Pages/Profile';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useState } from 'react';
function App() {
  const [users, setUsers] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <Signup users={users} setUsers={setUsers} />
          </Route>
          <Route path="/login">
            <Login users={users} setUsers={setUsers}/>
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
            <Navbar />
          </Route>
          <Route path="/post">
            <Header />
            <Post />
            <Navbar />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Navbar />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
