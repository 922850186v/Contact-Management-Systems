import './App.css';
import React from 'react';
import { BrowserRouter , Routes , Route , Link } from 'react-router-dom';
import ListUser from './components/ListUser';
import EditUser from './components/EditUser';
import { CreateUser } from './components/CreateUser';

function App() {


  const changeHandler=(e)=>{
    const value = e.target.value;
    console.log(value)
  }

  return (
    <div>
      
    
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-center align-items-center mt-4 mb-3">
          <ul className='navbar-nav'>
            <li>
              <Link to='/' className='navbar-brand '>User Contact Directory</Link>
            </li>
            {/* <li className='nav-item' >
              <Link to="/" className='nav-link active'>Home</Link>
            </li> */}
            <li>
              <Link to="user/create" className='nav-link'>Create User</Link>
            </li>
            {/* <li>
              <Link to="user/:id/edit">Edit User</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser/>}></Route>
          <Route path="user/create" element={<CreateUser />}></Route>
          <Route path="user/:id/edit" element={<EditUser />}></Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
