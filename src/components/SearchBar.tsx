import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Store} from '../store/Store';

type Props = {
  onPress: () => void;
};

const SearchBar = ({onPress}: Props) => {
  const {bestDeals, setBestFilProducts} = useContext(Store);
  const [showFilter, setShowFilter] = useState(false);

  const filterByAlphabet = () => {
    setShowFilter(!showFilter);
    if (bestDeals) {
      setBestFilProducts(() => {
        return [...bestDeals.data.deals].sort((a, b) => {
          return a.deal_title
            .toLowerCase()
            .localeCompare(b.deal_title.toLowerCase());
        });
      });
    }
  };

  const filterByPrice = () => {
    setShowFilter(!showFilter);
    if (bestDeals) {
      setBestFilProducts(() => {
        return [...bestDeals.data.deals].sort((a, b) => {
          return (
            parseFloat(a.deal_price.amount) - parseFloat(b.deal_price.amount)
          );
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchbar}>
          <FontAwesome name="search" size={25} color={'black'} />
          <Pressable onPress={onPress}>
            <TextInput
              placeholder="Search for Deals"
              editable={false}
              style={styles.searchTxt}
            />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowFilter(!showFilter);
            setTimeout(() => {
              setShowFilter(false);
            }, 3000);
          }}>
          <FontAwesome name="filter" size={35} color={'black'} />
        </TouchableOpacity>
        {showFilter ? (
          <View style={styles.filterBox}>
            <Text
              style={[styles.filterTxt, {borderBottomWidth: 1}]}
              onPress={filterByAlphabet}>
              Sort by A-Z
            </Text>
            <Text style={styles.filterTxt} onPress={filterByPrice}>
              Sort by Price
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  searchbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 0.5,
    borderRadius: 30,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  searchTxt: {
    fontSize: 20,
  },
  filterBox: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 10,
    zIndex:10,
  },
  filterTxt: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
