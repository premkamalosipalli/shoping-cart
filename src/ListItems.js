function ListItems({items, selectedItem, setSelectedItem}){
    

    function handleItemSelected(itemId){
      if(selectedItem?.id === itemId){
        setSelectedItem(null);
      }else{
        setSelectedItem(items.find(item => item.id === itemId));
      }
    }

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
                  <td><input type="checkbox" checked={selectedItem?.id === item.id} onChange={() => handleItemSelected(item.id)}/>
                  </td>
                </tr>
            );
          })
        }
      </tbody>
    </table>
  )
}

export default ListItems;