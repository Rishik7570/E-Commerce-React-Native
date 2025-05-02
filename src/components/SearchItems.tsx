import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {Store} from '../store/Store';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router/Router';

const SearchItems = () => {
  const {searchData,queryFilProducts,productDetailsAPI} = useContext(Store);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {searchData ? (
        <FlatList
          data={queryFilProducts.length ? queryFilProducts : searchData.data.products}
          keyExtractor={item => item.asin}
          style={styles.searchContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>{
                productDetailsAPI(item.asin);
                setTimeout(()=>{
                  navigation.navigate('Product');
                },800);
              }
              }
              style={styles.searchItems}>
              <Image
                source={{uri: item.product_photo}}
                style={styles.itemImg}
              />
              <Text selectable style={styles.itemName}>
                {item.product_title.slice(0, 25)}
              </Text>
              <Text style={styles.itemPrice}>{item.product_price}</Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
};

export default SearchItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: 10,
  },
  searchContainer: {
    gap: 10,
  },
  searchItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    padding: 5,
  },
  itemImg: {
    height: 40,
    width: '10%',
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
