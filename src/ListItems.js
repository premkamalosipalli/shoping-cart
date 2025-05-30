import { useState } from "react";
export default function ListItems({ items, selectedIds, dispatch }) {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelectedIds(itemId) {
    const updateSelection = selectedIds.includes(itemId)
      ? selectedIds.filter((id) => id !== itemId)
      : [...selectedIds, itemId];

    dispatch({
      type: "SET_SELECTED_IDS",
      payload: updateSelection,
    });
  }

  function handleSelectAll() {
    //Todo: check if all items are selected if clicked again deselect all
    if (filteredItems.length === selectedIds.length) {
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
                  items.length > 0 && selectedIds.length === items.length
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
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectedIds(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="item-count">
        {selectedIds.length} item{selectedIds.length !== 1 ? "s" : ""} selected
      </p>
    </>
  );
}
