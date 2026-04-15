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
import Notification from './Pages/Notification';
import Search from './Pages/Search';
import Userprofile from './Pages/Userprofile';
import Chat from './Pages/Chat';
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
          <Route path="/notification">
            <Header />
            <Notification/>
            <Navbar />
          </Route>
          <Route path="/user/:userEmail">
            <Userprofile/> 
          </Route>
          <Route path="/search">
            <Search/> 
            <Navbar/>
          </Route>
          <Route path="/chat">
            <Chat />
            <Navbar />
          </Route>
          <Route path="/profile">
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
