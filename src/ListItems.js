import { useContext, useState } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";

export default function ListItems() {

  const {state, dispatch} = useContext(ShoppingCartContext);

  const [query, setQuery] = useState("");

  const filteredItems = state.items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelectedIds(itemId) {
    const updateSelection = state.selectedIds.includes(itemId)
      ? state.selectedIds.filter((id) => id !== itemId)
      : [...state.selectedIds, itemId];

    dispatch({
      type: "SET_SELECTED_IDS",
      payload: updateSelection,
    });
  }

  function handleSelectAll() {
    //Todo: check if all items are selected if clicked again deselect all
    if (filteredItems.length === state.selectedIds.length) {
      dispatch({
        type: "SET_SELECTED_IDS",
        payload: [],
      });
    } else {
      dispatch({
        type: "SET_SELECTED_IDS",
        payload: filteredItems.map((item) => item.id),
      });
    }
  }

  function handleSearchItem(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <div className="search-container">
        <label className="search-label">Search Item:</label>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={handleSearchItem}
          placeholder="Type to filter items..."
        />
      </div>

      <table className="display-items">
        <thead>
          <tr>
            <th></th>
            <th>ITEM</th>
            <th>COUNT</th>
            <th>PURCHASED</th>
            <th>
              <input
                type="checkbox"
                checked={
                  state.items.length > 0 && state.selectedIds.length === state.items.length
                }
                onChange={handleSelectAll}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                  {item.purchased ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-xmark"></i>
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={state.selectedIds.includes(item.id)}
                    onChange={() => handleSelectedIds(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="item-count">
        {state.selectedIds.length} item{state.selectedIds.length !== 1 ? "s" : ""} selected
      </p>
    </>
  );
}
