import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomers, searchCustomers } from "../actions";

interface ICustomerSearchState {
  searchName: string;
}

interface ICustomerSearchProps {
  searchCustomers: (name: string) => void;
  getCustomers: () => void;
}

class CustomerSearch extends React.Component<
  ICustomerSearchProps,
  ICustomerSearchState
> {
  state = { searchName: "" };

  onSearchTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchName: event.target.value });
  };

  onSearchCustomer = () => {
    if (this.state.searchName !== "")
      this.props.searchCustomers(this.state.searchName);
  };

  render() {
    return (
      <div className="ui form">
        <div className="field">
          <label htmlFor="search">Enter Name</label>
          <input
            id="search"
            type="text"
            value={this.state.searchName}
            onChange={this.onSearchTextChanged}
          />
        </div>
        <div className="field">
          <button
            className="ui secondary button"
            onClick={this.onSearchCustomer}
          >
            Find
          </button>
          <Link className="ui button primary" to={`/customer/new`}>
            Add New Customer
          </Link>
          <button
            className="ui right floated button negative"
            onClick={this.props.getCustomers}
          >
            Reset Search
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { searchCustomers, getCustomers }
)(CustomerSearch);
