import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  FooterContainer,
  FooterName,
  FooterPrice,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <FooterContainer>
        <FooterName>{name}</FooterName>
        <FooterPrice>{price}</FooterPrice>
      </FooterContainer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
