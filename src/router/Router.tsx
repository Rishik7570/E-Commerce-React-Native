import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SearchPage from '../screens/SearchPage';
import ProductDetails from '../screens/ProductDetails';
import Cart from '../screens/Cart';


export type RootStackParamList = {
  Home: undefined;
  Search:undefined;
  Product:undefined;
  Cart:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Search" component={SearchPage} options={{headerShown:false}}/>
      <Stack.Screen name="Product" component={ProductDetails} options={{headerShown:false}}/>
      <Stack.Screen name="Cart" component={Cart} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default Router;
