import logo from './logo.svg';
import './App.css';
import Sidebar from './Left_Sidebar';
import HomePage from './HomePage';
import Right_Sidebar from './Right_Sidebar';

function App() {
  return (
    <div className="App">
      
      <div className="sidebar">
          {/* Left sidebar */}
          <Sidebar />
          {/* Middle part */}
          <HomePage />
           {/* RIght sidebar */}
           <Right_Sidebar />
      </div>
      
     
    </div>
  );
}

export default App;
