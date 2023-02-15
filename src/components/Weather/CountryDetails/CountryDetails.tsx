import { useState } from "react";
import CapitalWeather from "../CapitalWeather/CapitalWeather";

type postsProps = {
  posts: any[];
  inputValue: string;
  setInputValue: (value: string) => void;
};

const CountryDetails = (props: postsProps) => {
  const { posts, inputValue,setInputValue } = props;
  const [capitalDetails, setCapitalDetails] = useState<any[]>([]);
  const [active, setActive] = useState<boolean>(true);

  const handleCapital = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=391f6e8cff0a42eb93a150536230902&q=${inputValue}`);
    const data = await response.json();
    setCapitalDetails([data]);
    setActive(false);
    setInputValue("")
  };

  return (
    <div>
      {active ? (
        posts.map((elem: any, index: number) => {
          return (
            <div key={index}>
              <img src={elem.flags[1]} alt="country flag" />
              <li data-testid="capital">Capital: {elem.capital}</li>
              <li data-testid="population">Population:{elem.population}</li>
              <li data-testid="latitude">Latitude:{elem.latlng[0]}</li>
              <li data-testid="longitude">Longitude:{elem.latlng[1]}</li>
              <button onClick={handleCapital}>Capital Weather</button>
            </div>
          );
        })
      ) : (
        <CapitalWeather capitalDetails={capitalDetails} posts={[]} inputValue={""}/>
      )}
    </div>
  );
};

export default CountryDetails




