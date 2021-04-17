import propertyService from "../../services/property";

const INITIAL_STATE = { status: "loading" };

export const initPropertyDetails = () => {
  return async (dispatch) => {
    try {
      const data = await propertyService.getProperties();
      dispatch({
        type: "INIT_PROPERTIES_SUCCESS",
        data: data.properties,
      });
    } catch (error) {
      dispatch({
        type: "INIT_PROPERTIES_FAILURE",
        error,
      });
    }
  };
};

const propertyDetailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INIT_PROPERTIES_SUCCESS":
      return {
        status: "success",
        data: action.data,
      };
    case "INIT_PROPERTIES_FAILURE":
      return {
        status: "failure",
        error: action.error,
      };
    default:
      return state;
  }
};

export default propertyDetailReducer;
