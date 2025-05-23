import './App.css';
import { useState } from 'react';

function App() {
  const item = [{
    id: 1,
    name:"Bread",
    imageUrl:"https://media.istockphoto.com/id/522566233/photo/toast-bread.jpg?s=612x612&w=0&k=20&c=Dk7k60QaB4fVik7OyO9LQGi_a_2vEAdKX7GBJDzqskw=",
    count: 1,
    purchased: false
  }];

  const [items,setItems] = useState(item);
  const [showItems, setShowItems] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  function handleListItems(){
    setItems(item);
    setShowItems(true);
    setShowAddItem(false);
  }

  function handleAddItem(){
    setShowItems(false);
    setShowAddItem(true);
  }

  return (
    <div className='App'>
      <h1> Interactive Shoping Cart</h1>
      <hr />
      <ul>
        <li>
          <button onClick={handleListItems}>List Items</button>
        </li>
        <li>
          <button onClick={handleAddItem}>Add Item</button>
        </li>
        <li>
          <button>Update Item</button>
        </li>
        <li>
          <button>Delete Item</button>
        </li>
      </ul>
      <hr />
      
      {showAddItem && <AddItem newItem={onSubmitNewItem}/>}
      {showItems && <ItemList items={items} />}
    </div>
  );
}

export default App;

function ItemList({items}){
  return(
    <table className='display-items'>
      <thead>
        <tr>
          <th></th>
          <th>ITEM</th>
          <th>COUNT</th>
          <th>PURCHASED</th>
          <th>SELECTED</th>
        </tr>
      </thead>
      <tbody>
        {
          items.map(item => {
            return(
                
                <tr key={item.id}>
                  <td><img src={item.imageUrl} alt={item.name} width={50} height={50}/></td>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{
                  item.purchased 
                  ? <i className="fa-solid fa-check"></i> 
                  : <i className="fa-solid fa-xmark"></i>
                  }</td>
                  <td><input type="checkbox"/></td>
                </tr>
            );
          })
        }
      </tbody>
    </table>
  )
}

function handleAddFormSubmit(){
  alert("form clicked..!")
}

function AddItem({id, name, imageUrl, count, purchased}){
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1)
  const [purchased, setPurchase] = useState(false);

  function handleAddFormSubmit(e){
    e.preventDefault();
    console.log(itemName+":"+quantity+":"+purchased);
    setItemName("")
    setPurchase(false);
    setQuantity(1);
  }

  return (
  <>
      <h2>Fill the form below to add an item</h2>
      <form className="add-item" onSubmit={handleAddFormSubmit}>
        <div className="form-row">
          <label>Enter Name:</label>
          <input type="text" placeholder="Enter Item Name" value={itemName} onChange={(e)=>setItemName(e.target.value)} required/>
        </div>

        <div className="form-row">
          <label>Upload Image:</label>
          <input type="file" accept='.jpg, .png' />
        </div>

        <div className="form-row">
          <label>Quantity:</label>
          <input type="number" min="1" max="10" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
        </div>

        <div className="form-row">
          <label>Purchased:</label>
          <select  value={purchased} onChange={(e)=>setPurchase(e.target.value)}>
            <option>select</option>
            <option>True</option>
            <option>False</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

    </>
  )
}
