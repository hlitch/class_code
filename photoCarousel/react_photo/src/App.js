import React, { useState } from 'react';
import DisplayImages from './DisplayImages';

function App() {
  const [page, setPage] = useState();
  const [search, setSearch] = useState('');
  const [displayedImages, setDisplayedImages] = useState([]);
  async function getFlickr() {
    try {
      const response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c9ba425cd1aafe8bc179c234f8acccde&text=${search}&format=json&nojsoncallback=1`);
      const photos = await response.json();
      console.log(photos);
      const photosArray = Object.values(photos.photos.photo);
      console.log('what is photoArray now? ' + typeof photosArray);
      console.log('photoObject ' + typeof JSON.stringify(photosArray));
      setPage(photos);
      setDisplayedImages(photosArray);
    } catch (e) {
      console.log(e.message);
    }
  }

  function updateSearch(e) {
    setSearch(e.target.value);
  }


  return (
    <>
      <div>Please Enter a keyword for the photos you would like to see: <input onInput={(e) => updateSearch(e)} placeholder='ex "puppies"' />
        <button onClick={() => getFlickr()}>Submit</button>
      </div>
      {<DisplayImages images={displayedImages} />}
    </>
  );
}

export default App;
/*displayedImages.map(image => <DisplayImages key={image.phtos.photo.id} farmId={image.photos.photo.farm}
        server={ image.photos.photo.server} secret={image.photos.photo.secret} />)*//* <div>{requestedPhotos !== undefined ? requestedPhotos : []}</div> */