import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {

    const navigate = useNavigate();

    const [ input , setInput ] = useState({});
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(input);

        axios.post(`${process.env.REACT_APP_API_KEY}/save`, input)
        .then((response)=>{
            console.log(response.data);
            navigate('/');
        })
    }

    const hndleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInput(values=>({...values, [name]:value}));

    }
  return (
    <Wrapper>
        <h1>Create User</h1>
        <form action="" onSubmit={handleSubmit}>
            <table className='table table-hover'>
                <tbody>
                    <tr>
                        <th><label htmlFor="">Name :</label></th>
                        <td><input type="text" name="name" onChange={hndleChange} /><br /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="">Email :</label></th>
                        <td><input type="text" name="email"  onChange={hndleChange}/><br /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="">Mobile :</label></th>
                        <td><input type="number" name="mobile" onChange={hndleChange} /><br /></td>
                    </tr>
                </tbody>
            </table>
            
        <br />
            <button className='btn btn-success btn-m3' type="submit">Create</button>
        </form>
    </Wrapper>
  )



}
const Wrapper = styled.div`

    margin: auto;
    width: 50%;

    h1{
        text-align: center;
    }

    table{
        outline: aqua;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    button{
        justify-content: center;
    }
`