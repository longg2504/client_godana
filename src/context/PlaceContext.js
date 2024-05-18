import React, { createContext, useContext, useState } from 'react';

export const PlaceContext = createContext();

export const PlaceProvider = ({ children }) => {
    const [comfortableSelected, setComfortableSelected] = useState(-1);
    const [loadingSearchByPlace, setLoadingSearchByPlace] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [rating, setRating] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [address, setAddress] = useState("");
    const [placeList, setPlaceList] = useState([])
    const [placeLiked, setPlaceLiked] = useState([]);
    const [placeNerby, setPlaceNerby] = useState([])

    return (
        <PlaceContext.Provider value={{ 
            comfortableSelected,
            setComfortableSelected,
            loadingSearchByPlace,
            setLoadingSearchByPlace,
            searchValue,
            setSearchValue,
            categoryId, 
            setCategoryId,
            rating, 
            setRating,
            district, 
            setDistrict,
            ward, 
            setWard,
            address, 
            setAddress,
            placeList, 
            setPlaceList,
            placeLiked,
            setPlaceLiked,
            placeNerby, setPlaceNerby
             }}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlace = () => {
    const context = useContext(PlaceContext);
    if (context === undefined) {
        throw new Error('usePlace must be used within a PlaceProvider');
    }
    return context;
};