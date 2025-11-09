import { useState, useEffect, useCallback } from 'react'
import PopUp from './components/PopUp';
import SearchBox from './components/SearchBox';
import Gallery from './components/Gallery';
import Image from './utils/Image';
import './App.css'

function App({net}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [popUpInfo, setPopUpInfo] = useState(null)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const loadImages = useCallback(async (query = 10) => {
    setLoading(true)
    try {
      const response = await net.fetchImages(query)
      const imageObjects = response.map(imgData => new Image(imgData))
      setImages(imageObjects)
    } catch (error) {
      console.error('Error fetching images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [net])

  useEffect(() => {
    loadImages(10)
  }, []) 

  const handleSearchSubmit = (q) => {
    setSearchQuery(q)
    const query = q.trim() !== '' ? q : 10
    loadImages(query)
  }
  
  return (
    <div style={{display: `flex`, flexDirection: `column`, alignItems: `center`}}>
      <SearchBox 
        onSubmit={handleSearchSubmit} 
        value={searchQuery}
        onChange={setSearchQuery}
      />
      
      {loading ? (
        <div>Loading images...</div>
      ) : (
        <Gallery images={images} onClick={(image) => setPopUpInfo(image)}/>
      )}

      <PopUp value={popUpInfo} onClose={() => setPopUpInfo(null)} setQuery={handleSearchSubmit} />
    </div>
  );
}

export default App;