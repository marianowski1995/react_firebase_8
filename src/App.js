import { firestore } from './firebase';
import React from 'react';
import { useState, useEffect } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  const [editor, setEditor] = useState(false);
  const [creator, setCreator] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  // CRUD
  const getItems = () =>
    firestore.collection('items').onSnapshot(snapshot => {
      let result = [];
      snapshot.docs.forEach(doc => result.push({ id: doc.id, ...doc.data() }));
      setItems(result);
    });

  const removeItem = id => firestore.collection('items').doc(id).delete();

  const updateItem = item => {
    firestore
      .collection('items')
      .doc(item.id)
      .update({ ...item });
    setEditor(false);
  };

  const createItem = item => {
    firestore.collection('items').add(item);
    setCreator(false);
  };

  const selectItem = item => setSelectedItem(item);

  useEffect(() => getItems(), []);

  return (
    <>
      <button onClick={() => setCreator(true)}>+ item</button>
      {items.map(item => (
        <li key={item.id}>
          {item.name} | {item.price}
          <button onClick={() => removeItem(item.id)}>Remove</button>
          <button
            onClick={() => {
              setEditor(true);
              selectItem(item);
            }}
          >
            Update
          </button>
        </li>
      ))}
      <hr />
      {editor && <ItemsEditor item={selectedItem} updateItem={updateItem} />}
      {creator && <ItemsCreator createItem={createItem} />}
    </>
  );
}

// Components
const ItemsCreator = ({ createItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const newItem = {
    name: name,
    price: price,
  };

  return (
    <>
      Create Product <hr />
      <input
        onChange={e => setName(e.target.value)}
        placeholder="name"
        value={name}
      ></input>
      <input
        onChange={e => setPrice(e.target.value)}
        placeholder="price"
        value={price}
      ></input>
      <button onClick={() => createItem(newItem)}>Add</button>
    </>
  );
};

const ItemsEditor = ({ item, updateItem }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);

  const updatedItem = { id: item.id, name: name, price: price };

  return (
    <>
      Edit Product <hr />
      <input value={name} onChange={e => setName(e.target.value)}></input>
      <input value={price} onChange={e => setPrice(e.target.value)}></input>
      <button onClick={() => updateItem(updatedItem)}>Save</button>
    </>
  );
};
