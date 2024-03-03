import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../actions';
import { Dropdown, DropdownButton } from 'react-bootstrap';


const CategorySearch = () => {
    const dispatch = useDispatch();
  
    const handleSelect = (e) => {
      dispatch(updateCategory(e))
    }; 
  
    return (
      <div>
        <Dropdown className="drop-down-child"  >
            <DropdownButton 
            title="Category"
            id="dropdown-autoclose-true"
            onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
              <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
              <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
              <Dropdown.Item eventKey="Kids">Kids</Dropdown.Item>
              <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Garden">Garden</Dropdown.Item>
              <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
              <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
              <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
              <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
              <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
              <Dropdown.Item eventKey="Automotive">Automotive</Dropdown.Item>
              <Dropdown.Item eventKey="Jewelery">Jewelery</Dropdown.Item>
              <Dropdown.Item eventKey="Outdoors">Outdoors</Dropdown.Item>
              <Dropdown.Item eventKey="Babies">Babies</Dropdown.Item>
              <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
              <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
              <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
              <Dropdown.Item eventKey="Toys">Toys</Dropdown.Item>
              <Dropdown.Item eventKey="Movies">Movies</Dropdown.Item>
              <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
              </DropdownButton>  
        </Dropdown>
      </div>
    )
  };
  
  export default CategorySearch;