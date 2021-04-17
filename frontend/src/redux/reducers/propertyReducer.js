import propertyService from "../../services/property";

const INITIAL_STATE = { status: "loading" };

export const addProperty = (formData) => {
  return async (dispatch) => {
    const newProperty = await propertyService.addProperty(formData);

    dispatch({
      type: "ADD_PROPERTY",
      data: newProperty,
    });
  };
};

export const initProperties = () => {
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

export const deleteProperty = (id) => {
  return async (dispatch) => {
    await propertyService.deleteProperty(id);
    dispatch({
      type: "DELETE_PROPERTY",
      data: id,
    });
  };
};

export const searchProperty = (searchData) => {
  return async (dispatch) => {
    try {
      const { properties } = await propertyService.searchProperty(searchData);
      dispatch({
        type: "SEARCH_PROPERTY",
        data: properties,
      });
    } catch {}
  };
};

const propertyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      return [...state, action.data];
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
    case "DELETE_PROPERTY":
      return state.filter((property) => property.id !== action.data);
    case "SEARCH_PROPERTY":
      return action.data;
    default:
      return state;
  }
};

export default propertyReducer;
