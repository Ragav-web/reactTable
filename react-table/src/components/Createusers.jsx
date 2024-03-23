import React, { useState } from 'react';
import Select from 'react-select';

const options =[
    {value:"datascience",label:'Data Science'},
    {value:"python",label:'Python A to Z'},
    {value:"dsa",label:'DSA in Python'},
    {value:"ai",label:'AI'},
    {value:"machinelearning",label:'Machine Learning'},
    {value:"UI/UX",label:'UI/UX Designing'},
    {value:"webdevelopment",label:'Web Development'}
]

const Createusers = () => {
    const[users, setUsers] = useState({
        username:'',
        email:'',
        password:'',
        coursename:'',
    })
    const [selectedOptions, setSelectedOptions] = useState([]);

    function handleChange(e){
        const{value, name} = e.target
        setUsers(prevUsers =>{
            return{
                ...prevUsers,
                [name]: value
            }
        })  
    } 
    function handleOptions(selectedOption) {
        const selectedValues = selectedOption.map(option => option.value); 
        setSelectedOptions(selectedOption);
        console.log(selectedOption)
        console.log(selectedValues)
        setUsers(prevUsers => ({
            ...prevUsers,
            coursename: selectedValues
        }));
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(users)
        console.log(users)
    }
    // FUNCTION TO SUBMIT THE DATA to the API
    // async function handleSubmit(e){
    //     e.preventDefault()
    //     try{
    //         const response = await fetch('',{
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             body: JSON.stringify(users)
    //         })
    //         const data = await response.json()
    //         console.log('POST DATA:', data)
            
    //         if(!response.ok){
    //             console.log('failed to post data')
    //         }
            
    //         setUsers({
    //             username:'',
    //             email:'',
    //             password:'',
    //             coursename:'',
    //         })
    //     }catch(error){
    //         console.error('Error in posting', error)
    //     }
    // }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  value={users.username}
                  onChange={handleChange}
                  placeholder='Username'
                  name='username'
                  required
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input 
                  type='text'
                  value={users.email}
                  onChange={handleChange}
                  placeholder='Email'
                  name = 'email'
                  required
                />
            </div>
            <div>
                <label htmlFor='password'>Create Password</label>
                <input
                  type='password'
                  value={users.password}
                  onChange={handleChange}
                  placeholder='Password'
                  name = 'password'
                  required
                />
            </div>
            <div style={{width:'20%'}}>
                <Select 
                 options={options}
                 value ={selectedOptions}
                 onChange = {handleOptions}
                 isMulti ={true}
                 required
                />
            </div>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Createusers