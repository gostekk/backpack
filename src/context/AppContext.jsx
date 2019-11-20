import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dexie from 'dexie';

const db = new Dexie('Database');

db.version(1).stores({
  items: '++id, name, type, amount',
});

const AppContext = createContext();

const types = [
  {
    value: 'Undefined',
    label: 'Undefined',
  },
  {
    value: 'Weapon',
    label: 'Weapon',
  },
  {
    value: 'Armor',
    label: 'Armor',
  },
  {
    value: 'Adventure gear',
    label: 'Adventure gear',
  },
  {
    value: 'Tools',
    label: 'Tools',
  },
  {
    value: 'Gem',
    label: 'Gem',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

function AppProvider(props) {
  const [items, setItems] = useState([]);
  const { children } = props;

  const fetchItems = async () => {
    const dbItems = await db.items.orderBy('name').toArray();
    setItems(dbItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const getItem = (id) => {
    const result = items.find((item) => item.id === Number(id));
    return result;
  };

  const addItem = async (item) => {
    // Validate data

    // Save to database
    const result = await db.items.add(item);
    // Add new element to state items
    setItems([...items, { ...item, id: result }]);

    return result;
  };

  const editItem = async (id, updateData) => {
    // Validate data

    // Update database
    const result = await db.items.update(Number(id), updateData);
    console.log(result);
    // Load new data to state items
    fetchItems();

    return result;
  };

  const deleteItem = async (id) => {
    // Delete item from database
    const result = await db.items.delete(id);
    // Load new data to state items
    fetchItems();

    return result;
  };

  return (
    <AppContext.Provider
      value={{
        getItem,
        addItem,
        editItem,
        deleteItem,
        items,
        types,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export { AppContext, AppProvider };
