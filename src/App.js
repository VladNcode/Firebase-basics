import './styles.css';
import { app, database } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { useState } from 'react';

export default function App() {
  const [data, setData] = useState({});
  const Users = collection(database, 'users');

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setData({ ...data, ...newInput });
  };

  const handleSubmit = () => {
    addDoc(Users, {
      email: data.email,
      password: data.password
    })
      .then(() => {
        alert('Data added');
      })
      .catch((err) => alert(err.message));
  };

  const addUser = async () => {
    try {
      await addDoc(Users, {
        email: data.email,
        password: data.password
      });

      alert('User added!');
    } catch (error) {
      alert(error.message);
    }
  };

  const getUsers = async () => {
    const users = await getDocs(Users);

    const data = users.docs.map((el) => ({
      id: el.id,
      ...el.data()
    }));

    console.log(data);
  };

  const updateUser = async () => {
    try {
      const userToUpdate = doc(database, 'users', 'umFbz5E8m3hFOPd6ev9b');
      await updateDoc(userToUpdate, {
        email: 'test777'
      });

      alert('Successfully updated user!');
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteUser = async () => {
    try {
      const userToDelete = doc(database, 'users', 'mBz4vqlsWM1pMm3KQGko');
      const userToDelete2 = doc(database, 'users', 'jey36aAwCvniIeektpnh');
      await deleteDoc(userToDelete);
      await deleteDoc(userToDelete2);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <input
        name="email"
        placeholder="Email"
        onChange={(event) => handleInput(event)}
      />

      <input
        name="password"
        placeholder="Password"
        onChange={(event) => handleInput(event)}
      />
      <br />
      <button onClick={getUsers}>Submit</button>
    </div>
  );
}
