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

  // const [selectedItem, setSelectedItem] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
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
    if (!selectedIds || selectedIds.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} item(s) from the list?`
    );

    if (confirmDelete) {
      const updatedItems = items.filter(item => !selectedIds.includes(item.id));
      setItems(updatedItems);
      localStorage.setItem("shoppingCart", JSON.stringify(updatedItems));

      setNotification(`${selectedIds.length} item(s) deleted successfully!`);
      setNotificationType("error");
      setTimeout(() => setNotification(""), 3000);

      setSelectedIds([]); // Clear selection
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
          {selectedIds.length === 1 && <button onClick={handleUpdateItem}>Update Item</button>}
        </li>
        <li>
          {selectedIds.length > 0 && <button onClick={handleDeleteItem}>Delete Item</button>}
        </li>
      </ul>
      <hr />
      {viewMode === "list" && <ListItems 
        items={items} 
        selectedIds={selectedIds} 
        setSelectedIds={setSelectedIds}
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

      {viewMode === "update" && (
        <ItemForm
          mode="update"
          selectedIds={selectedIds}   
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
