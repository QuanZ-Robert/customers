import { ICustomer } from "../components/json-data/CustomerData";
import { ThunkAction } from "redux-thunk";
import { TAppState } from "../reducers";
import {
  ICreateCustomerAction,
  IDeleteCustomerAction,
  IEditCustomerAction,
  IGetCustomerAction,
  IGetCustomersAction
} from "./data-types/CustomerActionData";
import customerServer from "../api/customerServer";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  GET_CUSTOMER,
  GET_CUSTOMERS
} from "./types";
import history from "../history";

export const createCustomer = (
  customer: ICustomer
): ThunkAction<
  void,
  TAppState,
  null,
  ICreateCustomerAction
> => async dispatch => {
  try {
    const response = await customerServer.post("/customers", customer);
    dispatch({ type: CREATE_CUSTOMER, customer: response.data });
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const getCustomers = (): ThunkAction<
  void,
  TAppState,
  null,
  IGetCustomersAction
> => async dispatch => {
  try {
    const response = await customerServer.get("./customers");
    dispatch({ type: GET_CUSTOMERS, customers: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const getCustomer = (
  id: string
): ThunkAction<void, TAppState, null, IGetCustomerAction> => async dispatch => {
  try {
    const response = await customerServer.get(`/customers/${id}`);
    dispatch({ type: GET_CUSTOMER, customer: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const editCustomer = (
  id: string,
  customer: ICustomer
): ThunkAction<
  void,
  TAppState,
  null,
  IEditCustomerAction
> => async dispatch => {
  try {
    const response = await customerServer.patch(`/customers/${id}`, customer);
    dispatch({ type: EDIT_CUSTOMER, customer: response.data });
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const deleteCustomer = (
  id: string
): ThunkAction<
  void,
  TAppState,
  null,
  IDeleteCustomerAction
> => async dispatch => {
  try {
    await customerServer.delete(`/customers/${id}`);
    dispatch({ type: DELETE_CUSTOMER, customerId: id });
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};
