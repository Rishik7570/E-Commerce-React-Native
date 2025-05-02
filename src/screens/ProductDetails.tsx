import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, {useContext, useState} from 'react';
import TopBar from '../components/TopBar';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {Store} from '../store/Store';
import Feather from 'react-native-vector-icons/Feather';



const ProductDetails = () => {
  const {addToCart, product} = useContext(Store);

  const [img, setImg] = useState(0);

  const prevImg = () => {
    if (img !== 0) {
      setImg(img - 1);
    } else {
      setImg(0);
    }
  };

  const nextImg = () => {
    if (img !== product?.data.product_photos.length - 1) {
      setImg(img + 1);
    }
  };

  return product?.data ? (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imgContainer}>
          <TouchableOpacity style={styles.arrLeft} onPress={prevImg}>
            <Feather name="arrow-left" size={30} />
          </TouchableOpacity>
          <Image
            source={{uri: product.data.product_photos[img]}}
            style={styles.image}
          />
          <TouchableOpacity style={styles.arrRight} onPress={nextImg}>
            <Feather name="arrow-right" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.descTitle}>
          <Text style={styles.nameTxt}>{product.data.product_title}</Text>
          <View style={styles.ratingContainer}>
            <StarRatingDisplay
              rating={Number(product.data.product_star_rating)}
              color="red"
              starSize={40}
            />
            <Text>{`(${product.data.product_num_ratings})`}</Text>
          </View>
          <Text style={styles.nameTxt}>
            Price:{' '}
            <Text style={[styles.nameTxt, {fontWeight: 'bold'}]}>
              {product.data.product_price}
            </Text>
          </Text>
        </View>
        <View style={styles.descTitle}>
          <Text style={styles.aboutTitle}>Description</Text>
          {product.data.about_product.map((item, index) => (
            <Text key={index} style={styles.aboutTxt}>{'\u2022'} {item}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.linkBtn} onPress={()=>Linking.openURL(product.data.product_url)}>
          <Text style={styles.linkTxt}>Click here to check in Amazon</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.cartBtn} onPress={()=>addToCart(product)}>
        <Text style={styles.cartTxt}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#ff7f50" />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 201, 107, 0.41)',
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },
  imgContainer: {
    width: '90%',
    aspectRatio: 3 / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  arrLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  arrRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  descTitle: {
    width: '90%',
    gap: 10,
  },
  nameTxt: {
    fontSize: 20,
  },
  ratingContainer: {
    marginVertical: 5,
    flex: 1,
    alignItems: 'center',
  },
  aboutTxt: {
    fontSize:16,
  },
  aboutTitle: {
    fontSize:20,
    fontWeight:'bold',
  },
  linkBtn:{
    backgroundColor:'rgba(255, 255, 255, 0.6)',
    padding:3,
    marginBottom:10,
  },
  linkTxt:{
    fontSize:18,
  },
  cartBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    padding: 5,
    width: '90%',
    marginHorizontal: 'auto',
    borderRadius:20,
  },
  cartTxt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
