import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [apiData, setApiData] = useState({});
  const [val,setVal]=useState('');
  const [state,setState]=useState(false);
  const [isLoad,setIsLoad] = useState(false);
  const api=(v)=>{
    setIsLoad(true);
    axios.get(`https://api.weatherapi.com/v1/current.json?key=334d83b451464990bd675258233112&q=${v}`)
    .then((res)=>{setApiData(res.data)})
    .catch((err)=>{console.log(err)
    alert("Failed to fetch weather data");
      
    })
    .finally(()=>{
      setIsLoad(false);
    });
  }
  
  const call=(event)=>{
    event.stopPropagation();
    api(val);
    setState(true);

  }
  console.log(apiData);
  return (
    <div className='wrapper'>
      <div className='search'>
        <input type='text' onChange={(e)=>{
          setVal(e.target.value)
        }}/>
        <button onClick={call}>Search</button>
      </div>
      {isLoad&&<p className='load'>Loading data...</p>}
      {!isLoad && state && (
      <div className='weather-cards'>
        <div className='weather-card'>
          <h3>Temperature</h3>
          <p>{apiData.current?.temp_c}&deg;C</p>
         </div>
        <div className='weather-card'>
          <h3>Humidity</h3>
          <p>{apiData.current?.humidity}%</p>
          </div>
        <div className='weather-card'>
          <h3>Condition</h3>
          <p>{apiData.current?.condition?.text}</p>
          </div>
        <div className='weather-card'>
        <h3>Wind Speed</h3>
          <p>{apiData.current?.wind_kph} kph</p>
          </div>
      </div>)
      }
    </div>
  )
}

export default App
