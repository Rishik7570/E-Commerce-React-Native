import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Deal, Store} from '../store/Store';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../router/Router';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 24; // adjust spacing
const itemsPerPage = 6;

const BestDeal = () => {
  const {bestDeals, bestFilProducts} = useContext(Store);
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [visibleDeals, setVisibleDeals] = useState<Deal[]>([]);
  const [page, setPage] = useState(1);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const getLocalDeal = async (): Promise<Deal[]> => {
    const value = await AsyncStorage.getItem('best-Deals');
    return value ? JSON.parse(value) : [];
  };

  useEffect(() => {
    const loadDeals = async () => {
      if (bestFilProducts.length) {
        setAllDeals(bestFilProducts);
      } else if (bestDeals?.data?.deals) {
        setAllDeals(bestDeals.data.deals);
      } else {
        const localDeals = await getLocalDeal();
        setAllDeals(localDeals);
      }
    };

    loadDeals();
  }, [bestDeals, bestFilProducts]);

  useEffect(() => {
    if (allDeals.length) {
      const end = page * itemsPerPage;
      setVisibleDeals(allDeals.slice(0, end));
    }
  }, [allDeals, page]);

  const handleLoadMore = () => {
    if (visibleDeals.length < allDeals.length) {
      setPage(prev => prev + 1);
    }
  };

  const renderItem = ({item}: {item: Deal}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Product', {
          id: item.product_asin,
          name: item.deal_title,
          price: item.deal_price.currency + item.deal_price.amount,
          original_price: item.list_price.currency + item.list_price.amount,
          photo: item.deal_photo,
        })
      }>
      <Image source={{uri: item.deal_photo}} style={styles.cardImg} />
      <Text style={styles.cardText} numberOfLines={2}>
        {item.deal_title}
      </Text>
      <View style={styles.priceRow}>
        <Text style={styles.dealPrice}>
          {item.deal_price.currency} {item.deal_price.amount}
        </Text>
        <Text style={styles.listPrice}>
          {item.list_price.currency} {item.list_price.amount}
        </Text>
      </View>
      <Text style={styles.savingsText}>
        Save {item.savings_amount.currency} {item.savings_amount.amount} (
        {item.savings_percentage}%)
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>Our Best Deals</Text>
      <FlatList
        data={visibleDeals}
        keyExtractor={item => item.deal_id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={styles.flatList}
      />
      {visibleDeals.length < allDeals.length && (
        <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore}>
          <Text style={styles.loadMoreTxt}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BestDeal;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  flatList: {
    paddingBottom: 20,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImg: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c7',
  },
  listPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  savingsText: {
    marginTop: 4,
    fontSize: 12,
    color: '#f55',
  },
  loadMoreBtn: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loadMoreTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
