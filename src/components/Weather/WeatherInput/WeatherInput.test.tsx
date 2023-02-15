import { render, screen,fireEvent } from "@testing-library/react";
import WeatherInput from "./WeatherInput";

describe("rendering form", () => {
  test("renders the form", () => {
    render(<WeatherInput />);
    const formElem = screen.getByText("Submit");
    expect(formElem).toBeInTheDocument();
  });
  test("rendering input type", () => {
    render(<WeatherInput />);
    const inputElem = screen.getByLabelText("Country Name");
    expect(inputElem).toHaveAttribute("type", "text");
  });
  test("renders input field and placeholder", () => {
    render(<WeatherInput />);
    const inputbox = screen.getByRole("textbox");
    expect(inputbox).toBeInTheDocument();

    const placeholderText = screen.getByPlaceholderText("Enter Country");
    expect(placeholderText).toBeInTheDocument();

    const headerInput = screen.getByRole("heading", {
      name: "Weather Applictaion",
    });
    expect(headerInput).toBeInTheDocument();
  });
  test("disabled button",()=>{
   render(<WeatherInput/>)
   const inputElem = screen.getByLabelText("Country Name");
   fireEvent.change(inputElem, { target: { value: '' } });

   const disabledButton = screen.getByRole("button", {name: "Submit",});
    expect(disabledButton).toHaveAttribute("disabled")

    const submitButton = screen.getByRole("button", {name: "Submit",});
    expect(submitButton).toBeInTheDocument();
  })
  test("button enabled for non-empty",()=>{
   render(<WeatherInput/>)

   const inputElem2=screen.getByLabelText("Country Name")
   fireEvent.change(inputElem2,{target:{value:'india'}})

   const enabledBtn=screen.getByRole("button",{name:"Submit"})
   expect(enabledBtn).not.toBeDisabled()
  })
});


