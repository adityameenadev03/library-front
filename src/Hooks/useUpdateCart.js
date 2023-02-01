import { useBooksContext } from '../Hooks/useBooksContext';
import { useAuthContext } from '../Hooks/useAuthContext';
const useUpdateCart = () => {
    const { user } = useAuthContext()
    const { cartItems } = useBooksContext()
    let token
    if (user) {
        token = JSON.parse(localStorage.getItem('user')).token
    }


    const fetchCartItems = async () => {
        if (user) {
            const res = await fetch('/api/user/updateCartItems', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(cartItems),
            })
            const data = await res.json()
            return data
        } else {
            console.log("no user")
        }

    }

    return (
        { fetchCartItems }
    )
}

export default useUpdateCart