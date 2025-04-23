import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBar from '../components/TopBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router/Router';
import {useContext, useState} from 'react';
import {Store} from '../store/Store';
import SearchItems from '../components/SearchItems';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchPage = ({navigation}: Props) => {
  const {input, setInput, searchData, setQueryFilProducts} = useContext(Store);
  const data = [1]; // Dummy data just to render SearchItems

  const [showFilter, setShowFilter] = useState(false);

  const filterByAlphabet = () => {
    setShowFilter(false);
    if (searchData) {
      setQueryFilProducts(() => {
        return [...searchData.data.products].sort((a, b) =>
          a.product_title
            .toLowerCase()
            .localeCompare(b.product_title.toLowerCase()),
        );
      });
    }
  };

  const filterByPrice = () => {
    setShowFilter(false);
    if (searchData) {
      setQueryFilProducts(() => {
        return [...searchData.data.products].sort((a, b) => {
          const priceA = parseFloat(a.product_price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.product_price.replace(/[^0-9.]/g, ''));
          return priceA - priceB; // descending order
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header section outside the FlatList */}
      <TopBar />
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="home" size={35} />
        </TouchableOpacity>
        <TextInput
          placeholder="Enter Details"
          value={input}
          onChangeText={e => setInput(e)}
          style={[styles.searchTxt, styles.searchbar]}
        />
        <TouchableOpacity
          onPress={() => {
            setShowFilter(!showFilter);
            setTimeout(()=>{
              setShowFilter(false);
            },3000);
          }}>
          <FontAwesome name="filter" size={35} />
        </TouchableOpacity>
        {showFilter && (
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
        )}
      </View>

      {/* FlatList content */}
      <FlatList
        data={data}
        keyExtractor={() => 'dummy'}
        contentContainerStyle={styles.scrollContainer}
        renderItem={() => <SearchItems />}
      />
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 201, 107, 0.41)',
    flex: 1,
    gap: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchbar: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 30,
    padding: 8,
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
    zIndex: 99,
  },
  filterTxt: {
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
