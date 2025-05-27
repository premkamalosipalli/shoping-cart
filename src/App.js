import './App.css';
import { useState } from 'react';
import ListItems from './ListItems';
import ItemForm from './ItemForm';

function App() {
  const defaultItem = [{
    id: Date.now(),
    name:"Bread",
    imageUrl:"https://media.istockphoto.com/id/522566233/photo/toast-bread.jpg?s=612x612&w=0&k=20&c=Dk7k60QaB4fVik7OyO9LQGi_a_2vEAdKX7GBJDzqskw=",
    count: 1,
    purchased: false
  }];

  const [items,setItems] = useState(()=>{
    const stored = localStorage.getItem("shoppingCart");
    return stored ? JSON.parse(stored) : defaultItem;
  });
  const [viewMode, setViewMode] = useState("list" | "add" | "update");
  const [notificationType, setNotificationType] = useState("info");

  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState("");
  

  function handleListItems(){
    setViewMode("list")
  }

  function handleAddItem(){
    setViewMode("add");
  }

  function handleUpdateItem(){
    setViewMode("update")
  }

  function handleDeleteItem() {
    if (!selectedItem) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedItem.name} from Items?`
    );

    if (confirmDelete) {
      const deletedItems = items.filter(item => item.id !== selectedItem.id);
      setItems(deletedItems);
      localStorage.setItem("shoppingCart", JSON.stringify(deletedItems));

      setNotification("Item Deleted Successfully!");
      setNotificationType("error")
      setTimeout(()=>setNotification(""), 3000);
      setSelectedItem(null);
      setViewMode("list");
    }
  }


  return (
    
    <div className='App'>
    
    {notification && (
      <div className={`simple-toast ${notificationType}`}>
        {notification}
      </div>
    )}


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
          {selectedItem && <button onClick={handleUpdateItem}>Update Item</button>}
        </li>
        <li>
          {selectedItem && <button onClick={handleDeleteItem}>Delete Item</button>}
        </li>
      </ul>
      <hr />
      {viewMode === "list" && <ListItems 
        items={items} 
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem}
        setNotificationType={setNotificationType}
      />
      }

      {viewMode === "add" && (
        <ItemForm
          mode="add"
          items={items}
          setItems={setItems}
          setNotification={setNotification}
          setNotificationType={setNotificationType}
          setViewMode={setViewMode}
        />
      )}

      {viewMode === "update" && selectedItem && (
        <ItemForm
          mode="update"
          initialItem={selectedItem}   
          items={items}
          setItems={setItems}
          setNotification={setNotification}
          setNotificationType={setNotificationType}
          setViewMode={setViewMode}
        />
      )}


    </div>
  );
}

export default App;
