import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HButton from "../components/HButton";

describe("HButton component", () => {
  it("renders the button with the given children", () => {
    render(<HButton>Click me</HButton>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClick = jest.fn();
    render(<HButton onClick={onClick}>Click me</HButton>);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled prop is true", () => {
    render(<HButton disabled>Click me</HButton>);
    const button = screen.getByText("Click me") as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  it("set proper classes when bgCustom and textColorCustom props are added", () => {
    render(
      <HButton bgCustom="bg-purple-100" textColorCustom="text-yellow-200">
        My Btn
      </HButton>
    );
    const button = screen.getByText("My Btn");
    expect(button).toHaveClass("bg-purple-100 text-yellow-200");
  });

  it("add related classes when primary prop is true and bgCustom is not passed", () => {
    render(<HButton primary>Primary Btn</HButton>);
    const button = screen.getByText("Primary Btn");
    expect(button).toHaveClass("bg-pink-400");
  });

  it("set default classnames when neither primary nor bgCustom props are provided", () => {
    render(<HButton>Default Btn</HButton>);
    const button = screen.getByText("Default Btn");
    expect(button).toHaveClass("bg-transparent border-white");
  });

  it("sets the button type based on the 'type' prop", () => {
    render(<HButton type="submit">Submit type btn</HButton>);
    const button = screen.getByText("Submit type btn") as HTMLButtonElement;
    expect(button.type).toBe("submit");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<HButton>Snapshot test</HButton>);
    expect(asFragment()).toMatchSnapshot();
  });
});
