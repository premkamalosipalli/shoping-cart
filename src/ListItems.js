import { useState } from "react";
function ListItems({ items, selectedIds, setSelectedIds }) {
  const [query, setQuery] = useState("");

  function handleSelectedIds(itemId) {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
    } else {
      setSelectedIds([...selectedIds, itemId]);
    }
  }

  function handleSelectAll() {
    //Todo: check if all items are selected if clicked again deselect all
    if (filteredItems.length === selectedIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((item) => item.id));
    }
  }

  function handleSearchItem(e) {
    setQuery(e.target.value);
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

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

export default ListItems;
