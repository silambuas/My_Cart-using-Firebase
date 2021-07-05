import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { uiSliceAction } from '../Store/uiSlice';
import { useSelector } from 'react-redux';

const CartButton = (props) =>
{
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const cartToggleHandler = () =>
  {
    dispatch(uiSliceAction.toggleCart())
  }
  return (
    <button className={classes.button} onClick={cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{ cartQuantity}</span>
    </button>
  );
};

export default CartButton;
