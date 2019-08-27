import React from "react";
import { shallow } from "enzyme";
import CustomerDetailsForm from "../CustomerDetailsForm";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<CustomerDetailsForm formType="Create" />);
});

describe("Customer Details Forms Rendering", () => {
  it("should render a form", function() {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should render 3 inputs", function() {
    expect(wrapper.find("input")).toHaveLength(3);
  });

  it("should not have one button without formType props", function() {
    wrapper.setProps({ formType: undefined });
    expect(wrapper.find("button")).toHaveLength(0);
  });

  it("should have one button with formType Prop", function() {
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should not call function when click submit without input", function() {
    const clickFn = jest.fn();

    wrapper.setProps({ onFormSubmit: clickFn });

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });
    expect(clickFn).toBeCalledTimes(0);
  });

  it("should call function when click submit with input", function() {
    const clickFn = jest.fn();

    wrapper.setProps({ onFormSubmit: clickFn });
    wrapper.setState({
      firstName: "FirstName",
      lastName: "LastName",
      dateOfBirth: "08-02-1988"
    });

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });
    expect(clickFn).toHaveBeenCalled();
  });

  it("should change the state firstName when input", function() {
    wrapper
      .find("#firstName")
      .simulate("change", { target: { value: "Test FirstName" } });
    expect(wrapper.state("firstName")).toEqual("Test FirstName");
  });
});
