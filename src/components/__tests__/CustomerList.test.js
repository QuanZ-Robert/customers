import React from "react";
import { mount } from "enzyme";
import Root from "../../Root";
import { BrowserRouter } from "react-router-dom";
import CustomerList from "../CustomerList";
import CustomerCreate from "../CustomerCreate";

let wrapper;

beforeEach(() => {
  const initialState = {
    customers: [
      {
        firstName: "TestFirstName",
        lastName: "TestLastName",
        dateOfBirth: "1998-06-08",
        id: 1
      }
    ]
  };
  wrapper = mount(
    <Root initialState={initialState}>
      <BrowserRouter>
        <CustomerList />
        <CustomerCreate />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapper.unmount();
});

describe("Customer List Rendering", () => {
  it("should get 1 li element", async function() {
    await expect(wrapper.find("li")).toHaveLength(1);
  });

  it("should have firstName as TestFirstName", async function() {
    await expect(wrapper.render().text()).toContain("TestFirstName");
  });
});

describe("Customer Create Rendering", () => {
  it("should render Customer Details Form", async function() {
    await expect(wrapper.find("CustomerDetailsForm")).toHaveLength(1);
  });
});
