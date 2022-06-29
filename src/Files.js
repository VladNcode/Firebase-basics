import './styles.css';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app, storage } from './firebaseConfig';

export default function Files() {
  const [data, setData] = useState({});

  const handleSubmit = () => {
    const storageRef = ref(storage, data.name);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('default');
        }
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  return (
    <div className="Files">
      <input type="file" onChange={(event) => setData(event.target.files[0])} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}
