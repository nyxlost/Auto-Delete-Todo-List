import React, { useState } from 'react';
import './css/style.css';

interface Item {
  type: string;
  name: string;
}

const DataList: React.FC<{ items: Item[] }> = ({ items }) => {
  const [fruitItems, setFruitItems] = useState<Item[]>([]);
  const [vegetableItems, setVegetableItems] = useState<Item[]>([]);
  const [mainList, setMainList] = useState<Item[]>(items);
  const [timers, setTimers] = useState<{ [key: string]: number}>({});


  const moveItemToColumn = (item: Item) => {
    const addItemToList = (setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
      setList(prevState => [...prevState, item]);
    };

    const removeFromMainList = () => {
      setMainList(prevState => prevState.filter(i => i.name !== item.name));
    };

    if (item.type === 'Fruit') {
      addItemToList(setFruitItems);
    } else {
      addItemToList(setVegetableItems);
    }
    removeFromMainList();

    const newTimer = setTimeout(() => {
      returnToMainList(item);
    }, 5000);

    setTimers(prevTimers => ({
      ...prevTimers,
      [item.name]: newTimer,
    }));

    return () => {
      clearTimeout(newTimer);
    };
  };
  
  const returnToMainList = (item: Item) => {
    setMainList(prevState => [...prevState, item]); 
    setFruitItems(prevState => prevState.filter(fruit => fruit.name !== item.name));
    setVegetableItems(prevState => prevState.filter(veg => veg.name !== item.name));

    if (timers[item.name]) {
      clearTimeout(timers[item.name]);
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        delete newTimers[item.name];
        return newTimers;
      });
    }
  };

  return (
    <div className="sortable-list">
      <div className="column-main">
        {mainList.map(item => (
          <button key={item.name} onClick={() => moveItemToColumn(item)} className="button">
            {item.name}
          </button>
        ))}
      </div>
      <div className="column">
        <h2>Fruits</h2>
        {fruitItems.map(item => (
          <button key={item.name} onClick={() => returnToMainList(item)} className="button">
            {item.name}
          </button>
        ))}
      </div>
      <div className="column">
        <h2>Vegetables</h2>
        {vegetableItems.map(item => (
          <button key={item.name} onClick={() => returnToMainList(item)} className="button">
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataList;
