import { useState } from "react";

function ItemForm({
  mode,
  selectedIds,
  items,
  setItems,
  setNotification,
  setNotificationType,
  setViewMode,
}) {

  const initialItem = mode === "update"
  ? items.find(item => item.id === selectedIds[0])
  : null;

  const [itemName, setItemName] = useState(
    mode === "update" ? initialItem.name : ""
  );
  const [quantity, setQuantity] = useState(
    mode === "update" ? initialItem.count : 1
  );
  const [imageUrl, setImageUrl] = useState(
    mode === "update" ? initialItem.imageUrl : ""
  );
  const [purchased, setPurchase] = useState(
    mode === "update" ? initialItem.purchased : false
  );
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(mode !== "update");


  function handleFormSubmit(e) {
    e.preventDefault();

    const updatedOrNewItem = {
      id: mode === "update" ? initialItem.id : Date.now(),
      name: itemName,
      count: quantity,
      imageUrl: imageUrl,
      purchased: purchased,
    };

    let updatedItems;
    if (mode === "update") {
      updatedItems = items.map((item) =>
        item.id === initialItem.id ? updatedOrNewItem : item
      );
    } else {
      updatedItems = [...items, updatedOrNewItem];
    }

    setItems(updatedItems);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedItems));

    setNotification(
      mode === "update"
        ? "Item updated successfully!"
        : "Item added successfully!"
    );
    setNotificationType("success");
    setTimeout(() => setNotification(""), 3000);
    setViewMode("list");

    setItemName("");
    setQuantity(1);
    setImageUrl("");
    setPurchase(false);
  }

  function handleItemName(e) {
  const value = e.target.value;
  setItemName(value);
  validateForm(value, quantity, imageUrl, purchased);
}

function handleCount(e) {
  const value = e.target.value;
  setQuantity(value);
  validateForm(itemName, value, imageUrl, purchased);
}

function handlePurchased(e) {
  const value = e.target.value;
  const boolVal = value === "true";
  setPurchase(boolVal);
  validateForm(itemName, quantity, imageUrl, boolVal);
}

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      setError("No file selected.");
      setIsDisabled(true);
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("File is too large!");
      setIsDisabled(true);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      validateForm(itemName, quantity, reader.result, purchased);
    };
    reader.readAsDataURL(file);
  }

  function validateForm(name = itemName, qty = quantity, img = imageUrl, pur = purchased) {
    if (name.trim() === "") {
      setError("Item name cannot be empty.");
      setIsDisabled(true);
      return false;
    }
    if (!img) {
      setError("Image must be uploaded.");
      setIsDisabled(true);
      return false;
    }
    const count = Number(qty);
    if (isNaN(count) || count <= 0 || count > 10) {
      setError("Quantity must be between 1 and 10.");
      setIsDisabled(true);
      return false;
    }
    if (pur === null || pur === "") {
      setError("Purchase must be selected.");
      setIsDisabled(true);
      return false;
    }

    setError("");
    setIsDisabled(false);
    return true;
  }


  return (
    <>
      <h2>{mode === "update" ? "Update Item" : "Add New Item"}</h2>
      <form className="add-item" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label>Enter Name:</label>
          <input
            type="text"
            placeholder="Enter Item Name"
            value={itemName}
            onChange={handleItemName}
            required
          />
        </div>

        <div className="form-row">
          <label>Upload Image:</label>
          <input
            type="file"
            accept=".jpg,.jpeg, .png"
            onChange={handleImageUpload}
          />

          {imageUrl && (
            <img src={imageUrl} alt={itemName} width={50} height={50} />
          )}
        </div>

        <div className="form-row">
          <label>Count:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={handleCount}
          />
        </div>

        <div className="form-row">
          <label>Purchased:</label>
          <select value={String(purchased)} onChange={handlePurchased}>
            <option value="">select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit" disabled={isDisabled}>
          {mode === "update" ? "Update" : "Submit"}
        </button>

        {error && <div role="alert" className="error">{error}</div>}
      </form>
    </>
  );
}

export default ItemForm;
