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

  const [store, dispatch] = useReducer(reducer, {items: [
      {
        title: 'Frozen Foods',
        timestamp: 'on 18 July, Tuesday',
        status: '4/10',
        background: '#23AAD0',
      },
      {
        title: 'Personal Care',
        timestamp: 'on 18 July, Tuesday',
        status: '8/12',
        background: '#4d20c6',
      },
      {
        title: 'Cleaners',
        timestamp: 'on 18 July, Tuesday',
        status: '2/2',
        background: '#FA7D00',
      },
      {
        title: 'Beverages',
        timestamp: 'on 18 July, Tuesday',
        status: '4/10',
        background: '#1BB0F4',
      },
      {
        title: 'Bakery',
        timestamp: 'on 18 July, Tuesday',
        status: '3/9',
        background: '#149B24',
      }
    ]});
  return (
    <div>
      <h4>MY LIST</h4>
      <NMore className="box">
        {
          store.items.map(item => (
            <div className="category" style={{ background: item.background }}>
              <div className="category__left__wrapper">
                <div className="category__left">
                  <span className="category__left__header">
                    {item.title}
                  </span>
                  <p className="category__left__timestamp">
                    {item.timestamp}
                  </p>
                </div>
              </div>
              <div className="category__right">
                <p className="category__right__taskstatus">
                  {item.status}
                </p>
              </div>
            </div>
          ))
        }
      </NMore>
      {/*<button onClick={() => dispatch({type:'add'})}>*/}
      {/*  Add Item*/}
      {/*</button>*/}
      {/*<button onClick={() => dispatch({type:'remove'})}>*/}
      {/*  Remove Item*/}
      {/*</button>*/}
    </div>
  );
}
