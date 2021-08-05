import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  // waits until async useQuery function runs
  useEffect(() => {
    // if categoryData exists or has changed from useQuery response
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  // update click handler to update global state instead of using prop from Home
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
