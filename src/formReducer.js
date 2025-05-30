export default function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ALL_FIELDS":
      return {
        ...state,
        ...action.payload,
        isDisabled: false,
        error: "",
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isDisabled: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
        isDisabled: false,
      };
    default:
      return state;
  }
}
