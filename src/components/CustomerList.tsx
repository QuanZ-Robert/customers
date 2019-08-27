import React from "react";
import { connect } from "react-redux";
import { deleteCustomer, getCustomers } from "../actions";
import { TAppState } from "../reducers";
import { ICustomer } from "./json-data/CustomerData";
import { Link } from "react-router-dom";

interface ICustomerList {
  getCustomers: () => void;
  deleteCustomer: (id: string) => void;
  customerList: any[];
}
class CustomerList extends React.Component<ICustomerList> {
  componentDidMount(): void {
    this.props.getCustomers();
  }

  renderCustomerList = () => {
    const customers: ICustomer[] = this.props.customerList;

    if (customers && customers.length > 0) {
      return customers.map(customer => {
        return (
          <li className="item" key={customer.id}>
            <div className="right floated content">
              <Link
                className="ui button primary"
                to={`/customer/edit/${customer.id}`}
              >
                Edit
              </Link>
              <button
                className="ui button negative"
                onClick={() => this.onDeleteCustomer(customer.id)}
              >
                Delete
              </button>
            </div>
            <div>{`Full Name: ${customer.firstName} ${customer.lastName}`}</div>
            <div>{`Date of Birth: ${customer.dateOfBirth}`}</div>
          </li>
        );
      });
    }
  };

  onDeleteCustomer = (id: string | undefined) => {
    if (!id) return;
    this.props.deleteCustomer(id);
  };

  render() {
    return (
      <div>
        <h2>Customers List</h2>
        <div className="ui celled list">{this.renderCustomerList()}</div>
        <div className="field">
          <Link className="ui button primary" to={`/customer/new`}>
            Add New Customer
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: TAppState) => {
  return {
    customerList: Object.values(state.customers)
  };
};
export default connect(
  mapStateToProps,
  { getCustomers, deleteCustomer }
)(CustomerList);
