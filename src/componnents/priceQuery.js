import { useDispatch } from 'react-redux';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import { updateSortByPrice } from '../store/sortSlice';

const PriceQuery = () => {
const dispatch = useDispatch(); 

const handleSortByPriceChange = (e) => {
  dispatch(updateSortByPrice(e));
}

  return (
    <div>
      <Dropdown className="drop-down-child"  >
        <DropdownButton 
          className="drop-down-child"
          title="Price"
          id="dropdown-autoclose-true"
          onSelect={handleSortByPriceChange}
        >
        <Dropdown.Item eventKey="asc">Lowest to highest</Dropdown.Item>
        <Dropdown.Item eventKey="desc">Highest to lowest</Dropdown.Item>
        </DropdownButton>
        </Dropdown>
    </div>
  )
};

export default PriceQuery;