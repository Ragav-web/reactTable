import React from 'react'

export default function CreateUsers(){
    const[formData, setFormData] = React.useState({
        title:'',
        body:'',
        userId:1 
    });
    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log('POST DATA:', data)
            
            if(!response.ok){
                console.log('failed to post data')
            }
            
            setFormData({
                title:'',
                body:'',
                userId:1 
            })
        }catch(error){
            console.error('Error in posting', error)
        }
    }

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }
    return(
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor = "title">Title</label>
            <br/>
            <input
                type='title'
                id = 'title'
                value = {formData.title}
                onChange = {handleChange}
                name = 'title'
            />
        </div>
        <div>
            <label htmlFor='body'>Body</label>
            <br/>
            <textarea
                type = 'body'
                id = 'body'
                value = {formData.body}
                onChange = {handleChange}
                name = 'body'
            />
        </div>
            <button> Submit </button>
            </form>
        
    )
}