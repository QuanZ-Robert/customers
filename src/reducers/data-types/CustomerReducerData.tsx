import { ICustomer } from "../../components/json-data/CustomerData";

export interface ICustomerReducerState {
  customers: { [index: string]: ICustomer };
}
