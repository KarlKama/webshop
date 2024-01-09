import { useState } from 'react';
import Map from '../../components/map/Map';

const Shops = () => {
  const [coordinaates, setCoordinates] = useState({lngLat: [58.8811, 25.6322], zoom: 7});

  return (
  <div>
    <button onClick={() => setCoordinates({lngLat: [58.8811, 25.6322], zoom: 7})}>Kõik poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</button>
    <button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</button>
    <button onClick={() => setCoordinates({lngLat: [58.3785, 26.7318], zoom: 13})}>Tasku</button>
    <Map mapCoordinaates={coordinaates}/>
  </div>
  )
}

export default Shops;