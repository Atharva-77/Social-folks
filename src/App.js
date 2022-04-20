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