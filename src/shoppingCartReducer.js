export function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
        notification: "Item Added Successfully!",
        notificationType: "success",
      };
    }
    case "UPDATE_ITEM": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload?.id ? action.payload : item
        ),
        notification: "Item Updated Successfully!",
        notificationType: "success",
      };
    }
    case "DELETE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !state.selectedIds.includes(item.id)
        ),
        selectedIds: [],
        notification: "Item Deleted Successfully",
        notificationType: "success",
      };
    }

    case "SET_SELECTED_IDS": {
      return {
        ...state,
        selectedIds: action.payload,
      };
    }
    case "SET_VIEW_MODE": {
      return {
        ...state,
        viewMode: action.payload,
      };
    }
    case "SET_NOTIFICATION": {
      return {
        ...state,
        notification: action.payload.message,
        notificationType: action.payload.type,
      };
    }
    default:
      return state;
  }
}
