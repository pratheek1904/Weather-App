
  type Post = {
    capital: string;
    inputValue: string;
    Temperature: number;
    capitalDetails: any[];
    
  };
  
  type CapitalProps = {
    posts: Post[];
    capitalDetails: any[];
    inputValue: string;
  };


  const CapitalWeather = (props: CapitalProps) => {
    const { capitalDetails } = props;
    const weather = capitalDetails[0]?.current;

    return (
      <div>
        {weather ? (
          <>
            <img src={weather.condition.icon} alt="weather icon" />
            <li data-testid="temperature"> Temperature:{weather.temp_c} °C</li>
            <li>Speed:{weather.wind_kph} kph</li>
            <li>Precipitation:{weather.precip_in}</li>
          </>
        ) : null}
      </div>
    );
  };

  export default CapitalWeather;
  
  