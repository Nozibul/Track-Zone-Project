import {format} from 'date-fns';

const ClockDisplay = ({date, title, timezone, offset}) => {
    
  const offsetHour = offset / 60 ;
  return (
    <div style={{border: '1px solid green' , marginLeft:"0.5rem"}}> 
        <h2>TItle: {title}</h2>
        <h3>{format(date, "yyyy-MM-dd hh:mm:ss aaaaa'm'")}</h3>
        <p>{timezone} 
           {offsetHour < 0 
           ? `+${Math.abs(offsetHour)}` 
           : `-${Math.abs(offsetHour)}`}
        </p>
    </div>
  )
}

export default ClockDisplay