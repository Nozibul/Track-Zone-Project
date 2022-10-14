import React, { useEffect,useState } from 'react'
import { addMinutes } from 'date-fns';


const TIMEZONE_OFFSET ={
    PST: -7 * 60,
    EST: -4 * 60,
    EDT: -4 * 60,
    BST: 1 * 60,
    MST: -6 * 60
};

const useClock = (timezone, offset) => {
    const [date, setDate] = useState(null);
    const [localOffset, setLocalOffset] = useState(0);
    const [localTimezone, setLocalTimezone] = useState([])
    const [utc, setUTC] = useState(null)


    useEffect(()=>{
      let date = new Date();
     // console.log(d) //Tue Oct 11 2022 11:34:49 GMT+0600 (Bangladesh Standard Time)
  
      const offset = date.getTimezoneOffset();
      // console.log(offset); // -360
      setLocalOffset(offset);

     date = addMinutes(date, offset); 
    //  console.log(date); // Thu Oct 13 2022 17:47:55 GMT+0600 (Bangladesh Standard Time)
  
     setUTC(date);
    }, [])


    useEffect(()=>{
      if(utc !== null){
        if(timezone){
            offset = TIMEZONE_OFFSET[timezone] ?? offset ; // -360 or 60, or -240 etc
            const newUtc = addMinutes(utc, offset); 
            //  console.log(newUtc); // Thu Oct 13 2022 23:54:02 GMT+0600 (Bangladesh Standard Time)
            setDate(newUtc);
        }else{
          const newUtc = addMinutes(utc, -localOffset);
          //  console.log(newUtc);// Thu Oct 13 2022 17:54:55 GMT+0600 (Bangladesh Standard Time)
          const dateStrArr = newUtc.toUTCString().split(" ")
          //  console.log(dateStrArr);//Thu, 13 Oct 2022 11:55:27 GMT
          setDate(newUtc);
          setLocalTimezone(dateStrArr.pop()) // find last element 

        }
      }
    }, [utc, timezone, offset])

    return {
      date,
      dateUtc: utc,
      offset: offset || -localOffset,
      timezone: timezone || localTimezone,
      
    }

};

export default useClock ;