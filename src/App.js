import "./App.css";
import { useEffect, useReducer } from "react";
import ListItems from "./ListItems";
import ItemForm from "./ItemForm";
import { shoppingCartReducer } from "./shoppingCartReducer";
import { ShoppingCartContext } from "./ShoppingCartContext";

function App() {

  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(state.items));
  }, [state.items]);

  function handleAddItem() {
    dispatch({
      type: "SET_VIEW_MODE",
      payload: "ADD_ITEM",
    });
  }

  function handleUpdateItem() {
    dispatch({
      type: "SET_VIEW_MODE",
      payload: "UPDATE_ITEM",
    });
  }

  function handleDeleteItem() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${state.selectedIds.length} item(s)?`
    );
    if (!confirmDelete) return;

    dispatch({
      type: "DELETE_ITEM",
    });

    dispatch({
      type: "SET_VIEW_MODE",
      payload: "LIST_ITEM",
    });
  }

  return (
    <ShoppingCartContext.Provider value={{state, dispatch}}>
      <div className="App">
      {state.notification && (
        <div className={`simple-toast ${state.notificationType}`}>
          {state.notification}
        </div>
      )}

      <h1> Interactive Shoping Cart</h1>
      <hr />
      <ul>
        <li>
          <button onClick={handleAddItem}>Add Item</button>
        </li>
        <li>
          <button
            disabled={state.selectedIds.length !== 1}
            onClick={handleUpdateItem}
          >
            Update Item
          </button>
        </li>
        <li>
          <button
            disabled={!(state.selectedIds.length > 0)}
            onClick={handleDeleteItem}
          >
            Delete Item
          </button>
        </li>
      </ul>
      <hr />
      {state.viewMode === "LIST_ITEM" && (
        <ListItems
        />
      )}

      {state.viewMode === "ADD_ITEM" && (
        <ItemForm mode="ADD_ITEM" />
      )}

      {state.viewMode === "UPDATE_ITEM" && (
        <ItemForm
          mode="UPDATE_ITEM"
        />
      )}
    </div>
    </ShoppingCartContext.Provider>
  );
}

export default App;

const initialState = {
    items: JSON.parse(localStorage.getItem("shoppingCart") || "[]"),
    selectedIds: [],
    viewMode: "LIST_ITEM",
    notification: "",
    notificationType: "info",
  };
