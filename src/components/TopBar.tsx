import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../router/Router';

const TopBar = () => {
  const route = useRoute();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          route.name === 'Home' ? null : navigation.goBack();
        }}>
        <Feather
          name={route.name === 'Home' ? 'menu' : 'arrow-left'}
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate('Cart')}>
        <Feather name="shopping-cart" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
});
