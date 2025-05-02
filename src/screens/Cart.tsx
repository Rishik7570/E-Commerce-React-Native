import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import TopBar from '../components/TopBar';
import {Store} from '../store/Store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Cart = () => {
  const {cart,incrementCount,decrementCount,removeFromCart} = useContext(Store);

  return cart.length > 0 ? (
    <View style={styles.container}>
      <TopBar />
      <FlatList
        data={cart}
        keyExtractor={(item, index) => item.data.asin || index.toString()}
        contentContainerStyle={styles.cardContainer}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={{uri: item.data.product_photo}}
              style={styles.cardImg}
            />
            <View style={styles.cardDesc}>
              <Text style={styles.cardTitle}>
                {item.data.product_title?.slice(0, 50) || 'No Title'}
              </Text>
              <Text style={styles.cardPrice}>
                $ {Number(item.data.product_price.replace(/[^0-9.]/g, '')) * item.count}
              </Text>
              <View style={styles.countContainer}>
                <Pressable style={styles.countBtn} onPress={()=>decrementCount(item)}>
                  <FontAwesome name="arrow-down" size={20} />
                </Pressable>
                <Text style={styles.countTxt}>{item.count}</Text>
                <Pressable style={styles.countBtn} onPress={()=>incrementCount(item)}>
                  <FontAwesome name="arrow-up" size={20} />
                </Pressable>
              </View>
            </View>
            <TouchableOpacity style={styles.cardDlt} onPress={()=>removeFromCart(item.data.asin)}>
              <FontAwesome name="trash-o" size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkOutBtn}>
        <Text style={styles.checkOutTxt}>Proceed To Checkout</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.emptyView}>
        <Text style={styles.checkOutTxt}>Cart Empty</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 201, 107, 0.41)',
    flex: 1,
  },
  cardContainer: {
    padding: 10,
    gap: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },

  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },

  cardDesc: {
    flex: 1,
    gap: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardPrice: {
    color: 'green',
  },

  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  countBtn: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 4,
  },

  countTxt: {
    fontSize: 16,
  },

  cardDlt: {
    padding: 5,
  },
  checkOutBtn:{
    backgroundColor:'rgba(255, 255, 255, 0.6)',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:'90%',
    marginHorizontal:'auto',
    padding:10,
  },
  checkOutTxt:{
    fontSize:20,
    fontWeight:'bold',
  },
  emptyView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
});
