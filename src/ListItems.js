function ListItems({items, selectedIds, setSelectedIds}){
    

    // function handleItemSelected(itemId){
    //   if(selectedIds.id === itemId){
    //     setSelectedItem(null);
    //   }else{
    //     setSelectedItem(items.find(item => item.id === itemId));
    //   }
    // }

    function handleSelectedIds(itemId){
      if(selectedIds.includes(itemId)){
        setSelectedIds(selectedIds.filter(id => id !== itemId));
      }else{
        setSelectedIds([...selectedIds, itemId])
      }
    }

  return(
    <>
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
                    <td><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectedIds(item.id)}/>
                    </td>
                  </tr>
              );
            })
          }
        </tbody>
      </table>
      <p className="item-count">{selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected
      </p>

    </>
    
  )
}

export default ListItems;