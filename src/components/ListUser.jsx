import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListUser = () => {

    const [ user , setUser ] = useState([]);
    const [filterValue, setFilterValue] = useState('');

    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers=()=>{
        axios.get(`${process.env.REACT_APP_API_KEY}`)
        .then((response)=>{
            // console.log(response.data);
            setUser(response.data);
        })
    }

        const deleteUser=(id)=>{
        axios.delete(`${process.env.REACT_APP_API_KEY}/${id}/delete`)
        .then(response=>{
            console.log(response.data);
            getUsers();
            // navigate('/');
        })
    }

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
      }

      const filteredUsers = user.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));

  return (
    <Wraper>
        <h5>User Details</h5>
        <div className="form-group mt-2 mb-3 max-w-40px" >
        <input type="text" className="form-control" placeholder="Search by Name" value={filterValue} onChange={handleFilterChange} />
        </div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>#  </th>
                            <th>Name  </th>
                            <th>Email  </th>
                            <th>Mobile  </th>
                            <th>Actions  </th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user,key)=>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td> {user.name}</td>
                            <td> {user.email}</td>
                            <td> {user.mobile}</td>
                            <td>
                                <Link to={`user/${user.id}/edit`} className='btn btn-outline-secondary text-decoration-none m-2 p-2'>Edit</Link> 
                                <button className='btn btn-outline-danger m-1' onClick={()=>deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                                )}
                    </tbody>
                </table>

    </Wraper>
  )
}

const Wraper = styled.div`
    text-align: center;
    margin: auto;
    width: 60%;
    
    table tbody{
        vertical-align: middle;
    }
`

export default ListUser