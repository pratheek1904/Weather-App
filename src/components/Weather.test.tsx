import { render, fireEvent, screen} from '@testing-library/react';
import Weather from './Weather';

describe('Weather', () => {
  it('renders input and submit button', () => {
    render(<Weather />);
    const input = screen.getByPlaceholderText('Enter Country');
    const button = screen.getByText('Submit');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables submit button if input is empty', () => {
    render(<Weather />);
    const button = screen.getByText('Submit');

    expect(button).toBeDisabled();
  });

  it('enables submit button if input is not empty', () => {
    render(<Weather />);
    const input = screen.getByPlaceholderText('Enter Country');
    const button = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'USA' } });

    expect(button).toBeEnabled();
  });

  it('renders loading message when loading state is true', () => {
    render(<Weather />);
    const loading = screen.queryByText('Loading...');

    expect(loading).not.toBeInTheDocument();
  });

  it('renders error message when error state is not null', () => {
    const error = 'An error has occurred';
    render(<Weather />);
    const errorMessage = screen.queryByText(error);

    expect(errorMessage).not.toBeInTheDocument();
  });
});


describe('handleSubmit', () => {
  it('should set error state when fetch fails', async () => {
   render(<Weather />);

    const input = screen.getByPlaceholderText('Enter Country');
    fireEvent.change(input, { target: { value: 'invalid-country' } });
 });

  it('should set posts state when fetch is successful', async () => {
  render(<Weather />);

    const input = screen.getByPlaceholderText('Enter Country');
    fireEvent.change(input, { target: { value: 'france' } });

    const post = await screen.findByText('france');
    expect(post).toBeInTheDocument();
  });
});


describe('Country details', () => {
  it('renders country details and shows weather when the capital weather button is clicked', async () => {

    render(<Weather />)
    const subButton=screen.getByRole("button",{
      name:"Submit"
    })
    fireEvent.click(subButton)
    const capital = screen.getByTestId('capital');
    expect(capital).toHaveTextContent(/Capital/);

    const weatherButton = screen.getByText('Capital Weather');
    fireEvent.click(weatherButton);
    
    const windSpeed = screen.getByTestId('windSpeed');
    expect(windSpeed).toHaveTextContent(/Wind Speed/);
    
    const precipitation = screen.getByTestId('precipitation');
    expect(precipitation).toHaveTextContent(/Precipitation/);
  });
  test("render a list of element",async()=>{
    render(<Weather/>)
    const subButton=screen.getByRole("button",{
      name:"Submit"
    })
    fireEvent.click(subButton)
    const users=await screen.findAllByRole("listitem")
    expect(users).toHaveLength(3)
  })
});

