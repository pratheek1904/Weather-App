import { useState } from "react";
import CountryDetails from "../CountryDetails/CountryDetails";
import '../Weather.css'

const WeatherInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [posts, setPosts] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`https://restcountries.com/v3/name/${inputValue}`);
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  return (
    <div>
      <h2>Weather Applictaion</h2>
      <form onSubmit={handleSubmit}>
       <label>
       <h3> Country Name</h3> 
        <input
          type="text"
          className="input"
          placeholder="Enter Country"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /></label>&nbsp;
        <button className="submit" type="submit" disabled={!inputValue}>
          Submit
        </button>
      </form>
      <CountryDetails posts={posts} inputValue={inputValue} setInputValue={setInputValue}/>
    </div>
  );
};

export default WeatherInput;
