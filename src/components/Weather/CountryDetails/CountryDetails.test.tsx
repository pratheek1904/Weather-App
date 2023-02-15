import { fireEvent, render, screen } from '@testing-library/react';
import WeatherInput from '../WeatherInput/WeatherInput';
import CountryDetails from "./CountryDetails";

describe("Country details",()=>{
    
test('renders country details for each post', () => {
    const posts = [  
          {
            capital: 'Paris',    
            inputValue:'france',
            population: 67391582,
            latlng: [48.8566, 2.3522],
          flags: ['https://restcountries.com/data/fra.svg', 'https://restcountries.com/data/png/fra.png']
      },
      {
        capital: 'Tokyo',
        inputValue:'japan',
        population: 126150000,
        latlng: [35.6762, 139.6503],
        flags: ['https://restcountries.com/data/jpn.svg', 'https://restcountries.com/data/png/jpn.png']
      },
    ];
    render(<CountryDetails posts={posts} inputValue={''} setInputValue={function (value: string): void {
      throw new Error('Function not implemented.');
    } }/>);
    render(<WeatherInput/>)
  const submitBtn=screen.getByRole("button",{
    name:"Submit"
  })
  fireEvent.click(submitBtn)
    const capitals = screen.getAllByTestId('capital');
    expect(capitals).toHaveLength(2);
    expect(capitals[0]).toHaveTextContent('Capital: Paris');
    expect(capitals[1]).toHaveTextContent('Capital: Tokyo');
  
    const populations = screen.getAllByTestId('population');
    expect(populations).toHaveLength(2);
    expect(populations[0]).toHaveTextContent('Population:67391582');
    expect(populations[1]).toHaveTextContent('Population:126150000');
  
    const latitudes = screen.getAllByTestId('latitude');
    expect(latitudes).toHaveLength(2);

    expect(latitudes[0]).toHaveTextContent('Latitude:48.8566');
    expect(latitudes[1]).toHaveTextContent('Latitude:35.6762');
    
    const longitudes = screen.getAllByTestId('longitude');
    expect(longitudes).toHaveLength(2);
    expect(longitudes[0]).toHaveTextContent('Longitude:2.3522');
    expect(longitudes[1]).toHaveTextContent('Longitude:139.6503');
  
    const buttons = screen.getAllByRole('button', { name: 'Capital Weather' });
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Capital Weather');
    expect(buttons[1]).toHaveTextContent('Capital Weather');
    
  });
})
  