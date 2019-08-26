import { TCustomerAction } from "../actions/data-types/CustomerActionData";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  GET_CUSTOMER,
  GET_CUSTOMERS
} from "../actions/types";
import _ from "lodash";
import { ICustomerReducerState } from "./data-types/CustomerReducerData";

const INIT_STATE: ICustomerReducerState | {} = {};
export default (state = INIT_STATE, action: TCustomerAction) => {
  switch (action.type) {
    case CREATE_CUSTOMER: {
      const id = action.customer.id;
      if (!id) throw Error("Fail to create new customer");
      return { ...state, [id]: action.customer };
    }
    case GET_CUSTOMERS: {
      return { ...state, ..._.mapKeys(action.customers, "id") };
    }
    case GET_CUSTOMER: {
      const id = action.customer.id;
      if (!id) throw Error("Fail to get customer");
      return { ...state, [id]: action.customer };
    }
    case EDIT_CUSTOMER: {
      const id = action.customer.id;
      if (!id) throw Error("Fail to get customer");
      return { ...state, [id]: action.customer };
    }
    case DELETE_CUSTOMER: {
      return _.omit(state, action.customerId);
    }
    default:
      return state;
  }
};
