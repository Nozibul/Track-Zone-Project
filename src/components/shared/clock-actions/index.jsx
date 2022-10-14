import { useState } from "react";

 const defaultOffset =[
   -11.50 , -11 , -10.50, -10, -9.50, -9, -8.50, -8, -7.50, -7, -6.50, -6, -5.50, -5
 ]
 
const ClockActions = ({local = false , clock, updateClock}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleChange =(e)=>{
    let {name, value} = e.target ;
    if(name === 'offset'){
      value = parseInt(value) * 60 ;
    }
    updateClock({
      [name]: value // title:value={clock.title}, timezone:value={clock.timezone}, offset:value={offset}
    })
    
  }

  return (
    <>
      <button onClick={()=>setIsEdit(!isEdit)} >Edit</button>
      {local ? <button>Create</button> : <button>Delete</button>}
      {isEdit && (
        <div>
          <input onChange={handleChange} type="text" name="title" value={clock.title} />
          <select name="timezone" value={clock.timezone} onChange={handleChange}>
            <option value="GMT">GMT</option>
            <option value="UTC">UTC</option>
            <option value="PST">PST</option>
            <option value="EST">EST</option>
            <option value="EDT">EDT</option>
            <option value="BST">BST</option>
            <option value="MST">MST</option>
          </select>
          {(clock.timezone === 'GMT' || clock.timezone === 'UTC') && (
            <select onChange={handleChange} name="offset" value={clock.offset / 60}>
              {defaultOffset.map(offset=>(
                <option key={offset} value={offset}>{offset}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </>
  )
}

export default ClockActions;