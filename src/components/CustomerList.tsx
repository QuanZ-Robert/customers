import React from "react";
import { connect } from "react-redux";
import { deleteCustomer, getCustomers } from "../actions";
import { TAppState } from "../reducers";
import { ICustomer } from "./json-data/CustomerData";
import { Link } from "react-router-dom";
import CustomerSearch from "./CustomerSearch";

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
            <div>{`First Name: ${customer.firstName}`}</div>
            <div>{`Last Name: ${customer.lastName}`}</div>
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
        <div>
          <CustomerSearch />
        </div>
        {this.props.customerList.length > 0 && (
          <div className="ui raised very padded text container segment">
            <h3>Show List</h3>
            <div className="ui celled list">{this.renderCustomerList()}</div>
          </div>
        )}
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
