import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

export const EditUser = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [ inputs , setInputs ] = useState([]);

    const handleSubmit = (e)=>{
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_API_KEY}/${id}/edit` , inputs)
        .then((response)=>{
            setInputs(response.data);
            console.log(response.data);
            navigate('/');
        })
    }


    useEffect(()=>{
        getUsers();
    },[]);

        const getUsers=()=>{
            axios.get(`${process.env.REACT_APP_API_KEY}/${id}`)
            .then((response)=>{
                setInputs(response.data);
            })
        }


    const hndleChange=(e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values=>({...values, [name]:value}));
    }
    
  return (
    <Wrapper>
        <h1>Edit User</h1>
        <form action="" onSubmit={handleSubmit}>
            <table className='table table-hover'>
                    <tbody key={inputs.id}>
                    <tr>
                        <th><label htmlFor="" className='form-lable'>Name :</label></th>
                        <td><input value={inputs.name} type="text" name="name" onChange={hndleChange}  /><br /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="">Email :</label></th>
                        <td><input value={inputs.email} type="text" name="email"  onChange={hndleChange}/><br /></td>
                    </tr>
                    <tr>
                        <th><label htmlFor="">Mobile :</label></th>
                        <td><input value={inputs.mobile} type="number" name="mobile" onChange={hndleChange} /><br /></td>
                    </tr>
                </tbody>
            </table>
            
        <br />
            <button className='btn btn-success m-3' type="submit" >Save</button>
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
        float: inline-end;
    }
`
export default EditUser