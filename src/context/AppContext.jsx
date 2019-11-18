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
    const dbItems = await db.items.orderBy('name').limit(10).toArray();
    setItems(dbItems);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (item) => {
    // Validate data

    // Save to database
    const result = await db.items.add(item);
    // Add new element to state items
    // setItems([...items, result]);

    return result;
  };

  const editItem = async (id, updateData) => {
    // Validate data

    // Update database
    const result = await db.items.update(id, updateData);
    // Load new data to state items
    // setItems(db.items.toArray());

    return result;
  };

  const deleteItem = async (id) => {
    // Delete item from database
    const result = await db.items.delete(id);
    // Load new data to state items
    // setItems(db.items.toArray());

    return result;
  };

  return (
    <AppContext.Provider
      value={{
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
