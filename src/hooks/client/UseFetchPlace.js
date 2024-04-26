import React , { useEffect, useState } from 'react'
import PlaceService from '../../service/PlaceService'

export default function UseFetchPlace() {
    const [loading, setLoading] = useState(true);
    const [placeList, setPlaceList] = useState([])
    useEffect(() => {
        async function getPlaceList() {
            try {
                let placeRes = await PlaceService.getPlaceList();
                setPlaceList(placeRes.data.content)
            } catch (error) {
                console.log('Error fetching place list:', error);
            } finally {
                setLoading(false);
            }
        }
        getPlaceList();
    }, [])
    return { placeList, loading , setPlaceList };
}
