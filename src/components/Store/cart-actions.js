import { uiSliceAction } from "./uiSlice"
import { cartActions } from "./cartSlice"

export const fetchCartData = () =>
{
    return async (dispatch) =>
    {
        const fetchData = async () =>
        {
            const response = await fetch("https://react-cart-cd818-default-rtdb.firebaseio.com/cart.json")
            
            if (!response.ok)
            {
                throw new Error("Could not fetch data!")
            }

            const data = await response.json()

            return data;
        }

        try
        {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity
            }))
        } catch (error)
        {
            dispatch(uiSliceAction.showNotification({
                status: "error",
                title: "Error!",
                message: "Fetching cart data Failed!",
            }))
        }
    }
}

export const sendCartData = (cart) =>
{
    return async (dispatch) =>
    {
        dispatch(uiSliceAction.showNotification
        ({
            status: "pending",
            title: "Sending",
            message: "Sending cart data!",
        }))

        const sendRequest = async () =>
        {
            const response = await fetch("https://react-cart-cd818-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
            });
            if (!response.ok)
            {
                throw new Error("Sending cart data failed")
            }
        }
        try
        {
            await sendRequest()
            dispatch(uiSliceAction.showNotification({
                status: "success",
                title: "Success...",
                message: "Sent cart data succeessfully!...",
            }))
        } catch (error)
        {
            dispatch(uiSliceAction.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart data Failed!",
            }))
        }
        
        
    }
}
