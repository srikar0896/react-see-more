import React, { useReducer } from 'react';
import NMore from '../NMore';
import { log } from '../utils';

export default () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          items: [...state.items, state.items.length+1],
        };
      case "remove":
        const items = state.items;
        items.splice(state.items.length-1,1);
        return {
          items,
        };
      default:
        return state;
    }
  };

  const [store, dispatch] = useReducer(reducer, {items: [1,2,3,4,5,6,7,8,9,10]});
  return (
    <div>
      <h1>NMore</h1>
      <NMore className="box">
        {
          store.items.map(item => (
            <p key={item}>
              {`List Item ${item}`}
            </p>
          ))
        }
      </NMore>
      <button onClick={() => dispatch({type:'add'})}>
        Add Item
      </button>
      <button onClick={() => dispatch({type:'remove'})}>
        Remove Item
      </button>
    </div>
  );
}
