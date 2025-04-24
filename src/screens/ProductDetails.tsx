import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import TopBar from '../components/TopBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router/Router';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {Store} from '../store/Store';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const ProductDetails = ({route}: Props) => {
  const {
    id,
    name,
    photo,
    price,
    original_price,
    starRating,
    numRating,
    delivery,
    url,
  } = route.params;
  const {addToCart} = useContext(Store);

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{uri: photo}} style={styles.image} />
        <View style={styles.descTitle}>
          <Text style={styles.nameTxt}>{name}</Text>
          <Text style={styles.nameTxt}>
            Price- <Text style={styles.nameTag}>{original_price}</Text> {price}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <StarRatingDisplay
            rating={starRating ? starRating : 4}
            starSize={25}
            color="red"
          />
          <Text>{numRating ? `(${numRating})` : null}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() =>
          addToCart({
            asin: id,
            product_title: name,
            product_photo: photo,
            product_original_price: original_price,
            product_price: price,
            delivery: delivery,
            product_url: url,
            product_num_ratings: numRating,
            product_star_rating: starRating,
          })
        }>
        <Text style={styles.cartTxt}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 201, 107, 0.41)',
    flex: 1,
  },
  scrollContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },
  image: {
    height: 500,
    width: '90%',
  },
  descTitle: {
    width: '90%',
    gap: 10,
  },
  nameTag: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    fontWeight: 'light',
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    marginVertical: 5,
    flex: 1,
    flexDirection: 'row',
  },
  cartBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    padding: 5,
    width: '90%',
    marginHorizontal: 'auto',
  },
  cartTxt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
