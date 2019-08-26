import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  GET_CUSTOMER,
  GET_CUSTOMERS
} from "../types";
import { ICustomer } from "../../components/json-data/CustomerData";

export type TCustomerAction =
  | ICreateCustomerAction
  | IGetCustomersAction
  | IGetCustomerAction
  | IEditCustomerAction
  | IDeleteCustomerAction;

export interface ICreateCustomerAction {
  type: typeof CREATE_CUSTOMER;
  customer: ICustomer;
}

export interface IGetCustomersAction {
  type: typeof GET_CUSTOMERS;
  customers: ICustomer[];
}

export interface IGetCustomerAction {
  type: typeof GET_CUSTOMER;
  customer: ICustomer;
}

export interface IEditCustomerAction {
  type: typeof EDIT_CUSTOMER;
  customer: ICustomer;
}

export interface IDeleteCustomerAction {
  type: typeof DELETE_CUSTOMER;
  customerId: string;
}
