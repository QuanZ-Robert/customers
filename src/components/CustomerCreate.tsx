import React from "react";
import CustomerDetailsForm from "./CustomerDetailsForm";
import { ICustomer } from "./json-data/CustomerData";
import { connect } from "react-redux";
import { createCustomer } from "../actions";

interface ICustomerCreateProps {
  createCustomer: any;
}

class CustomerCreate extends React.Component<ICustomerCreateProps> {
  onCustomerCreation = (customer: ICustomer) => {
    this.props.createCustomer(customer);
  };

  render() {
    return (
      <div>
        <CustomerDetailsForm
          formType="Create"
          onFormSubmit={this.onCustomerCreation}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { createCustomer }
)(CustomerCreate);
