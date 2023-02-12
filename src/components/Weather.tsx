import React, {useState } from "react";
import '../components/Weather.css'
const Weather: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);
  const [details, setDetails] = useState<any>({});
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://restcountries.com/v3/name/${inputValue}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data)
      if (data.length === 0) {
        setError("Country not found. Please try again with a valid country name.");
        setLoading(false);
        return;
      }

      setPosts(data);
    
      setActive(true);
    } catch (err:any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  async function handleCapital(e:React.SyntheticEvent<EventTarget>) {
    e.preventDefault()
    setLoading(true);
    try {
      let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=391f6e8cff0a42eb93a150536230902&q=${inputValue}`)
      let data = await response.json()
      setDetails(data)
      setActive(false)
      setInputValue("")
      setLoading(false);
    } catch (err:any) {
      setError(`An error occurred: ${err.message}`);
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Country"
          className="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />&nbsp;
        <button 
        className="submit"
        type="submit"
         disabled={!inputValue}>
          Submit
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    
   <div >
   {
  active
    ? posts.map((elem, index) => {
        return (
          <div key={index} data-testid="country-details" className="container">
          <h1>Country detail</h1>
            <img src={elem.flags[1]} alt="Country flag" />
            <li data-testid="capital">Capital: {elem.capital}</li>
            <li  data-testid="population">Country's population: {elem.population}</li>
            <li  data-testid="latitude">Latitude: {elem.latlng[0]}</li>
            <li  data-testid="longitude">Longitude: {elem.latlng[1]}</li>
            <button onClick={handleCapital} className="capWeather">Capital Weather</button>
          </div>
        );
      })
    : details.current && (
        <div className="container">
             <h1>Country details</h1>
          <img src={details.current.condition.icon} alt="Weather icon" />
          <p>Temperature: {details.current.temp_c}°C</p>
          <p>Wind Speed: {details.current.wind_kph} kph</p>
          <p>Precipitation: {details.current.precip_in}</p>
        </div>
      )
}

   </div>
    </>
  );
};

export default Weather;