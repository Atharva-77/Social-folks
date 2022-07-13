import logo from './logo.svg';
import './App.css';
import Sidebar from './Left_Sidebar';
import HomePage from './HomePage';
import Right_sidebar from './Right_Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { Provider } from 'react-redux';
import store from './Store';
import PostDetails from './PostDetails';
import Profile from './Profile';
import Follow from './Follow';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
       
     
      <Router >
         <Switch >
       
            <Route path="/register">
               <Register/>
            </Route>

            <Route path="/login">
               <Login/>
            </Route> 

            <Route path="/profile/:id">
               <div className="sidebar">
                  <Sidebar />
                  <Profile />
                  <Right_sidebar />
               </div>
            </Route> 

            <Route path="/follow/:id">
               <div className="sidebar">
                  <Sidebar />
                  <Follow />
                  <Right_sidebar />
               </div>
            </Route> 

            <Route path="/post/:id">
               <div className="sidebar">
                  <Sidebar />
                  <PostDetails/>
                  <Right_sidebar />
               </div>
            </Route> 

            <Route path="/">
              <div className="sidebar">
                 
                  <Sidebar />
                  <HomePage />
                  <Right_sidebar />

               </div>
            </Route>

         </ Switch>
      </ Router>
     
    </div>
    </Provider> 
  );
}

export default App;

 {/* <Route path="/"> */}
                {/* Left sidebar */}
                {/* <Sidebar /> */}

                {/* Middle part */}
                {/* <HomePage /> */}
                
                {/* RIght sidebar */}
                {/* <Right_sidebar /> */}
              {/* </Route> */}