import {FlatList, StatusBar, Text, View} from 'react-native';
import BestDeal from '../components/BestDeal';
import SearchBar from '../components/SearchBar';
import TopBar from '../components/TopBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router/Router';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  const dummy = [1]; // dummy data just to render BestDeal in ListFooterComponent

  return (
    <View style={{backgroundColor: 'rgba(255, 201, 107, 0.41)', flex: 1}}>
      <StatusBar hidden barStyle={'dark-content'} />

      <TopBar />
      <Text style={{fontWeight: 'bold', fontSize: 25, marginHorizontal: 10}}>
        Hello
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: 'rgba(19, 19, 19, 0.5)',
          marginHorizontal: 10,
        }}>
        Welcome to R-Mazon.
      </Text>

      <SearchBar onPress={() => navigation.navigate('Search')} />

      <FlatList
        data={dummy}
        keyExtractor={() => 'dummy'}
        renderItem={() => <BestDeal />}
      />
    </View>
  );
};

export default Home;
