import React, { createContext, useContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [comfortableSelected, setComfortableSelected] = useState(-1);


    return (
        <PostContext.Provider value={{ 
            posts, 
            setPosts,
            comfortableSelected, 
            setComfortableSelected
             }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};