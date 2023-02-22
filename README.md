## React with Firebase 8

- simple functions using firebase 8 for all crud operations

# functions

## get()

```jsx
const get = () =>
  firestore.collection('col').onSnapshot(snap => {
    let result = [];
    snap.docs.forEach(doc => result.push({ id: doc.id, ...doc.data() }));
  });
```

## add()

```jsx
const create = item => firestore.collection('items').add(item);
```

## update()

```jsx
const update = item => {
  firestore
    .collection('col')
    .doc(item.id)
    .update({ ...item });
};
```

## delete()

```jsx
const removeItem = id => firestore.collection('items').doc(id).delete();
```
