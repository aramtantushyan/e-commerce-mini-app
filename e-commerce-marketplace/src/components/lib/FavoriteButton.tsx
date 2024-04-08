import { useContext } from "react";
import { Pressable } from "react-native";

import { FavoriteIcon, FilledFavoriteIcon } from "../svg/svgIcons";
import { IProduct } from "../../utils/types/product";
import { WishlistContext } from "../../contexts/wishlist/WishlistContext";

interface IFavoriteButtonProps {
    size?: number,
    isFavorite: boolean,
    product: IProduct
}

const FavoriteButton: React.FC<IFavoriteButtonProps> = ({ size = 18, isFavorite, product }) => {
    const { removeFromWishlistData, addToWishlistData } = useContext(WishlistContext);

    const addRemoveFavoriteHandler = async () => {        
        if (isFavorite) {
            removeFromWishlistData?.(product.id);
        } else {
            addToWishlistData?.(product);
        }
    }

    return (
        <Pressable onPress={addRemoveFavoriteHandler} style={{ padding: 8 }}>
            {isFavorite ? <FilledFavoriteIcon size={size}/> : <FavoriteIcon size={size} />}
        </Pressable>
    );
};
export default FavoriteButton;
