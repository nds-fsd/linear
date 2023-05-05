import {React,useState} from 'react'
import IssueStyle from './inputIssue.module.css'
import axios from 'axios'


const InputIssue = () => {

    const options=['Sprint Backlog','Backlog','In Progress','QA','Done','Cancelled']
    const options2=['Gerardo','Rocio','Benjamin','Anthony','Oriol','Fernando']
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [selected, setSelected] = useState(options[0])
    const [selected2, setSelected2] = useState(options2[0])

    const handleSubmit=(e)=>{
        // e.preventDefault(); 
        // alert(`form submitted ${title} 
        // ${desc}
        // ${selected}
        // ${selected2}`);


        const formData={
            title:title,
            author:selected2,
            status:selected,
            description:desc
        }
        const addElement = (formData) => {
            const options = {
              method:'POST',
              headers: {
                  'Content-Type': "application/json; charset=utf-8",
                  'Authorization': JWToken
                }
            }
          const url = 'http://localhost:3001/tasks'
          axios.post( url, formData, options)
          }
         
          addElement(formData)
       }

  return (
    <div className={IssueStyle.wrapper}>
   
    <form onSubmit={handleSubmit}>

        <div className={IssueStyle.container}>
            <div className={IssueStyle.container1}>
                
                    <h4 className={IssueStyle.card_title}>Project</h4>
                    <h4 className={IssueStyle.card_title}>New Issue</h4>
                    <p>x - o</p>
            </div>

            <div className={IssueStyle.input_container}>
                <input  
                className={IssueStyle.input_data} 
                type='text'
                 placeholder='Issue Title'
                 value={title}
                 onChange={(e)=>settitle(e.target.value)}   
                 />
                <textarea 
                 placeholder='add a description...' 
                 className={IssueStyle.input_data}
                 value={desc}
                 onChange={(e)=>setdesc(e.target.value)}></textarea>
            </div>

            <div >
                <label htmlFor='status' className={IssueStyle.labels}>Status</label>
                <select 
                name='status'
                className={IssueStyle.select_data} 
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
                >
                    {options.map((value)=>
                    (<option value={value} key={value}>{value}</option>))
                    }
                </select>   
                <label htmlFor='author' className={IssueStyle.labels}>Asignado a</label>
                  <select 
                name='author'  
                className={IssueStyle.select_data} 
                onChange={(e) => setSelected2(e.target.value)}
                value={selected2}
                >
                    {options2.map((value)=>
                    (<option value={value} key={value}>{value}</option>))
                    }
                </select>        
            </div>
              
            <div className={IssueStyle.button_data}>
                <button type='submit'>Add Issue</button>
            </div>  
              
        </div>    
    </form>
    </div>
  )
}

export default InputIssue