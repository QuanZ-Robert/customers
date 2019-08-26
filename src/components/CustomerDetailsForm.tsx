import React, { ChangeEvent, FormEvent } from "react";
import { ICustomer } from "./json-data/CustomerData";
import { Link } from "react-router-dom";

interface ICreationFormProps {
  initialFirstName?: string;
  initialLastName?: string;
  initialDateOfBirth?: string;
  formType: string;
  onFormSubmit: (customer: ICustomer) => void;
}

interface ICreationFormState {
  firstName: string | null;
  lastName: string | null;
  dataOfBirth: string | null;
  errorMessage: string | null;
}
class CustomerDetailsForm extends React.Component<
  ICreationFormProps,
  ICreationFormState
> {
  state = {
    errorMessage: null,
    firstName: this.props.initialFirstName ? this.props.initialFirstName : "",
    lastName: this.props.initialLastName ? this.props.initialLastName : "",
    dataOfBirth: this.props.initialDateOfBirth
      ? this.props.initialDateOfBirth
      : ""
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.dataOfBirth
    ) {
      this.setState({
        ...this.state,
        errorMessage: "Please complete all fields before submit"
      });
      return;
    }

    this.props.onFormSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dataOfBirth
    });
  };

  onFirstNameUpdated = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, firstName: e.target.value });
  };

  onLastNameUpdated = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, lastName: e.target.value });
  };

  onDateOfBirthUpdated = (e: ChangeEvent<HTMLDataElement>) => {
    this.setState({ ...this.state, dataOfBirth: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="ui form error">
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              value={this.state.firstName}
              onChange={this.onFirstNameUpdated}
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              value={this.state.lastName}
              onChange={this.onLastNameUpdated}
            />
          </div>
          <div className="field">
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={this.state.dataOfBirth}
              onChange={this.onDateOfBirthUpdated}
            />
          </div>
          <div className="field">
            <button className="ui button primary" type="submit">
              {this.props.formType}
            </button>
            <Link className="ui button negative" to={`/`}>
              Cancel
            </Link>
          </div>
        </form>
        {!!this.state.errorMessage && (
          <div className="ui error message">
            Please Complete all fields before submit
          </div>
        )}
      </div>
    );
  }
}

export default CustomerDetailsForm;
