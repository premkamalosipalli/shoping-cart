import { useReducer, useEffect } from "react";
import formReducer from "./formReducer";

function ItemForm({ mode, selectedIds, items, dispatch }) {
  const initialItem =
    mode === "UPDATE_ITEM"
      ? items.find((item) => item.id === selectedIds[0])
      : null;

  const initialFormState = {
    itemName: "",
    quantity: 1,
    imageUrl: "",
    purchased: false,
    error: "",
    isDisabled: mode !== "UPDATE_ITEM",
  };

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    if (mode === "UPDATE_ITEM" && initialItem) {
      formDispatch({
        type: "SET_ALL_FIELDS",
        payload: {
          itemName: initialItem.name,
          quantity: initialItem.count,
          imageUrl: initialItem.imageUrl,
          purchased: initialItem.purchased,
        },
      });
    }
  }, [mode, initialItem]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: mode === "UPDATE_ITEM" ? initialItem.id : Date.now(),
      name: formState.itemName,
      count: formState.quantity,
      imageUrl: formState.imageUrl,
      purchased: formState.purchased,
    };

    dispatch({
      type: mode === "UPDATE_ITEM" ? "UPDATE_ITEM" : "ADD_ITEM",
      payload: newItem,
    });

    if (mode === "UPDATE_ITEM") {
      dispatch({ type: "SET_SELECTED_IDS", payload: [] });
    }

    dispatch({ type: "SET_VIEW_MODE", payload: "LIST_ITEM" });
  }

  function validateForm(name, qty, img, pur) {
    if (name.trim() === "") {
      formDispatch({
        type: "SET_ERROR",
        payload: "Item name cannot be empty.",
      });
      return false;
    }

    if (!img) {
      formDispatch({ type: "SET_ERROR", payload: "Image must be uploaded." });
      return false;
    }

    const count = Number(qty);
    if (isNaN(count) || count <= 0 || count > 10) {
      formDispatch({
        type: "SET_ERROR",
        payload: "Quantity must be between 1 and 10.",
      });
      return false;
    }

    if (pur === null || pur === "") {
      formDispatch({
        type: "SET_ERROR",
        payload: "Purchase must be selected.",
      });
      return false;
    }

    formDispatch({ type: "CLEAR_ERROR" });
    return true;
  }

  function handleItemName(e) {
    const value = e.target.value;
    formDispatch({ type: "SET_FIELD", field: "itemName", value });
    validateForm(
      value,
      formState.quantity,
      formState.imageUrl,
      formState.purchased
    );
  }

  function handleCount(e) {
    const value = e.target.value;
    formDispatch({ type: "SET_FIELD", field: "quantity", value });
    validateForm(
      formState.itemName,
      value,
      formState.imageUrl,
      formState.purchased
    );
  }

  function handlePurchased(e) {
    const value = e.target.value === "true";
    formDispatch({ type: "SET_FIELD", field: "purchased", value });
    validateForm(
      formState.itemName,
      formState.quantity,
      formState.imageUrl,
      value
    );
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      formDispatch({ type: "SET_ERROR", payload: "No file selected." });
      return;
    }

    if (file.size > 1024 * 1024) {
      formDispatch({ type: "SET_ERROR", payload: "File is too large!" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      formDispatch({
        type: "SET_FIELD",
        field: "imageUrl",
        value: reader.result,
      });
      validateForm(
        formState.itemName,
        formState.quantity,
        reader.result,
        formState.purchased
      );
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <h2>{mode === "UPDATE_ITEM" ? "Update Item" : "Add New Item"}</h2>
      <form className="add-item" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label>Enter Name:</label>
          <input
            type="text"
            placeholder="Enter Item Name"
            value={formState.itemName}
            onChange={handleItemName}
            required
          />
        </div>

        <div className="form-row">
          <label>Upload Image:</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
          />
          {formState.imageUrl && (
            <img
              src={formState.imageUrl}
              alt="preview"
              width={50}
              height={50}
            />
          )}
        </div>

        <div className="form-row">
          <label>Count:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formState.quantity}
            onChange={handleCount}
          />
        </div>

        <div className="form-row">
          <label>Purchased:</label>
          <select
            value={String(formState.purchased)}
            onChange={handlePurchased}
          >
            <option value="">select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit" disabled={formState.isDisabled}>
          {mode === "UPDATE_ITEM" ? "Update" : "Submit"}
        </button>

        {formState.error && (
          <div role="alert" className="error">
            {formState.error}
          </div>
        )}
      </form>
    </>
  );
}

export default ItemForm;
