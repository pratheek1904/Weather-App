import { render,screen,waitFor} from "@testing-library/react"
import Weather from "./Weather"

describe("test case for input fields",()=>{
 test("input box",()=>{
    render(<Weather/>)
    const inputElem=screen.getByRole("textbox")
    expect(inputElem).toBeInTheDocument()
 })
  
  test("button disabled",()=>{
    render(<Weather/>)
    const disabledbtn=screen.getByRole("button")
    expect(disabledbtn).toBeDisabled()

    const submitbtn=screen.getByRole("button",{
        name:"Submit"
    })
    expect(submitbtn).toBeInTheDocument()
  })

  test("placeholder",()=>{
    render(<Weather/>)
    const pHolder=screen.getByPlaceholderText("Enter Country")
  expect(pHolder).toBeInTheDocument()
  }) 

  test("Loading and error",()=>{
    render(<Weather/>)
    const loadingelem=screen.queryByText("Loading...")
    expect(loadingelem).not.toBeInTheDocument()

    const errorelem=screen.queryByText("Error")
    expect(errorelem).not.toBeInTheDocument()
  })
})

describe("post detail component",()=>{

    test("render country details correctly", async() => {
        render(<Weather />);

        const listElem = await waitFor(() => screen.findAllByTestId("details"));

        expect(listElem).toHaveLength(6);
      });
      
})

