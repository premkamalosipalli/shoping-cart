import { useState } from "react";

function ItemForm({mode, initialItem, items, setItems, setNotification, setNotificationType, setViewMode}){
    const [itemName, setItemName] = useState(mode === "update" ? initialItem.name : "");
    const [quantity, setQuantity] = useState(mode === "update" ? initialItem.count : 1);
    const [imageUrl, setImageUrl] = useState(mode === "update" ? initialItem.imageUrl : "");
    const [purchased, setPurchase] = useState(mode === "update" ? initialItem.purchased : false);


    function handleFormSubmit(e) {
    e.preventDefault();

    const updatedOrNewItem = {
        id: mode === "update" ? initialItem.id : Date.now(),
        name: itemName,
        count: quantity,
        imageUrl: imageUrl,
        purchased: purchased
    };

    let updatedItems;
    if (mode === "update") {
        updatedItems = items.map(item =>
        item.id === initialItem.id ? updatedOrNewItem : item
        );
    } else {
        updatedItems = [...items, updatedOrNewItem];
    }

    setItems(updatedItems);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedItems));

    setNotification(
        mode === "update" ? "Item updated successfully!" : "Item added successfully!"
    );
    setNotificationType("success");
    setTimeout(() => setNotification(""), 3000);
    setViewMode("list");

    setItemName("");
    setQuantity(1);
    setImageUrl("");
    setPurchase(false);
    }


  return (
  <>
      <h2>{mode === "update" ? "Update Item" : "Add New Item"}</h2>
      <form className="add-item" onSubmit={handleFormSubmit}>
        <div className="form-row">
          <label>Enter Name:</label>
          <input type="text" placeholder="Enter Item Name" value={itemName} onChange={(e)=>setItemName(e.target.value)} required/>
        </div>

        <div className="form-row">
          <label>Upload Image:</label>
          <input type="file" accept='.jpg,.jpeg, .png' onChange={
            (e) => {
                const file = e.target.files[0];
                if(!file) return;

                if (file.size > 1024 * 1024) {
                    setNotification("Image is too large. Please use one under 1MB.");
                    setNotificationType("error");
                    setTimeout(() => setNotification(""), 3000);
                    return;
                }

                const render = new FileReader();
                render.onloadend = () =>{
                    setImageUrl(render.result);
                }

                render.readAsDataURL(file);
                
            }
            }
            />

          {imageUrl && <img src={imageUrl} alt={itemName} width={50} height={50}/>}
        </div>

        <div className="form-row">
          <label>Quantity:</label>
          <input type="number" min="1" max="10" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
        </div>

        <div className="form-row">
          <label>Purchased:</label>
          <select  value={String(purchased)} onChange={(e)=>setPurchase(e.target.value === "true")}>
            <option value="">select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit" disabled={!itemName.trim()}>
            {mode === "update" ? "Update" : "Submit"}
        </button>
      </form>

    </>
  )
}

export default ItemForm;