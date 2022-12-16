import './App.css';
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Main from "./components/main/main";
import {Navigate, Route, Routes} from "react-router";
import UserDetails from "./components/userDetails/userDetails";


function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/userDetails' element={<UserDetails/>}/>
            <Route path='/*' element={<Navigate to='/'/>} />
        </Routes>
    </div>
  );
}

export default App;
