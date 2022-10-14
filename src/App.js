import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [dogs, setDogs] = useState([]);
  const [image, setImage] = useState();
  const inputSelect = useRef(null);

  const loadDogs = async () => {
    await fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => {
        setDogs(data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDogs();
  }, []);

  const generateImage = async () => {
    await fetch(
      `https://dog.ceo/api/breed/${inputSelect.current.value}/images/random`
    )
      .then((response) => response.json())
      .then((data) => {
        setImage(data.message);
      });
  };

  return (
    <>
      <div className='App'>
        <select
          onChange={(e) => {
            generateImage();
          }}
          ref={inputSelect}
        >
          <option>Select breed</option>
          {dogs &&
            Object.keys(dogs).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
        </select>

        {image && (
          <>
            <img src={image} alt='' />
            <button onClick={() => generateImage()}>Generate another</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
