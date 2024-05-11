import React, { useState } from 'react'
import BodyDetail from './BodyDetail';
import "../css/Client.css"
import "../css/ClientDetail.css"
import HeaderDetail from './HeaderDetail';

const PlaceDetail = () => {
    // const [loading, setLoading] = useState(true);
    const [placeName ,setPlaceName] = useState("")

  return (
    <div>
        <HeaderDetail placeName={placeName}/>
        <BodyDetail setPlaceName={setPlaceName}/>
    </div>
  )
}

export default PlaceDetail