import { render, screen } from '@testing-library/react';
import CapitalWeather from './CapitalWeather';

describe('CapitalWeather', () => {
  it('renders the temperature when the weather data is available', () => {
    const weatherData = {
      current: {
        condition: {
          icon: 'weather-icon-url',
        },
        temp_c: 23,
        wind_kph: 10,
        precip_in: 0.1,
      },
    };
    render(<CapitalWeather capitalDetails={[weatherData]} posts={[]} inputValue={''} />);

    const temperatureEl = screen.getByTestId('temperature');
    expect(temperatureEl).toHaveTextContent('Temperature:23 °C');
    expect(screen.getByAltText('weather icon')).toHaveAttribute('src', 'weather-icon-url');
    expect(screen.getByText('Speed:10 kph')).toBeInTheDocument();
    expect(screen.getByText('Precipitation:0.1')).toBeInTheDocument();
  });

  it('does not render anything when the weather data is not available', () => {
    render(<CapitalWeather capitalDetails={[]} posts={[]} inputValue={''} />);
    expect(screen.queryByTestId('temperature')).not.toBeInTheDocument();
  });
});
