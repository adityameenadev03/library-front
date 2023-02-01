import React from 'react'
import { useBooksContext } from '../Hooks/useBooksContext';
import { useAuthContext } from '../Hooks/useAuthContext';
const useUpdateFavBooks = () => {
    const { user } = useAuthContext()
    const { books, favBooks, dispatch, cartItems } = useBooksContext()
    let token
    if (user) {
        token = JSON.parse(localStorage.getItem('user')).token
    }

        let fetchBooks = async () => {
            if(user){
                const res = await fetch('/api/user/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(favBooks),
                })
                const data = await res.json()
                return data
            }else{
                console.log("no user")
            }
      
    }


    return (
        { fetchBooks }
    )
}

export default useUpdateFavBooks