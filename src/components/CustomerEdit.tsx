import React from "react";
import { TAppState } from "../reducers";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { editCustomer, getCustomer } from "../actions";
import { ICustomer } from "./json-data/CustomerData";
import CustomerDetailsForm from "./CustomerDetailsForm";

interface ICustomerEditProps {
  getCustomer: (id: string) => void;
  editCustomer: (id: string, customer: ICustomer) => void;
  customer: ICustomer;
}
class CustomerEdit extends React.Component<
  RouteComponentProps<{ id: string }> & ICustomerEditProps
> {
  componentDidMount(): void {
    this.props.getCustomer(this.props.match.params.id);
  }

  onSubmit = (customer: ICustomer) => {
    this.props.editCustomer(this.props.match.params.id, customer);
  };

  render() {
    const { customer } = this.props;
    return (
      <div>
        {customer && (
          <CustomerDetailsForm
            formType="Edit"
            initialFirstName={customer.firstName}
            initialLastName={customer.lastName}
            initialDateOfBirth={customer.dateOfBirth}
            onFormSubmit={this.onSubmit}
          />
        )}
      </div>
    );
  }
}

type OwnProps = RouteComponentProps<{ id: string }>;

const mapStateToProps = (state: TAppState, ownProps: OwnProps) => {
  const id: string = ownProps.match.params.id;
  const customer: { [index: string]: any } = state.customers;

  return {
    customer: customer[id]
  };
};

export default connect(
  mapStateToProps,
  { getCustomer, editCustomer }
)(CustomerEdit);
