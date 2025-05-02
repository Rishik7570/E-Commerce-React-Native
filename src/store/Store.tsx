import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, ReactNode, useEffect, useState} from 'react';
import Config from 'react-native-config';

type Props = {
  children: ReactNode;
};

export type Deal = {
  canonical_deal_url: string;
  deal_badge: string;
  deal_ends_at: string;
  deal_id: string;
  deal_photo: string;
  deal_price: {
    amount: string;
    currency: string;
  };
  list_price: {
    amount: string;
    currency: string;
  };
  deal_title: string;
  deal_state: string;
  deal_type: string;
  product_asin: string;
  savings_amount: {
    amount: string;
    currency: string;
  };
  savings_percentage: number;
  type: string;
};

type bestDealType = {
  data: {
    deals: Array<Deal>;
  };
};

export type queryProducts = {
  asin: string;
  delivery?: string;
  product_original_price: string;
  product_price: string;
  product_photo: string;
  product_star_rating?: number;
  product_num_ratings?: number;
  product_title: string;
  product_url?: string;
};

type queryDataType = {
  data: {
    products: [queryProducts];
  };
};

export type productDetailsType = {
  data: {
    asin: string;
    product_title: string;
    product_price: string;
    currency: string;
    product_star_rating: string;
    product_num_ratings: string;
    product_url: string;
    product_photo: string;
    product_photos: string[];
    product_availability: string;
    about_product: string[];
    product_description: string;
    product_information: {
      'Product Dimensions': string;
      'Item Weight': string;
      ASIN: string;
      'Item model number': string;
      Batteries: string;
      'Best Sellers Rank': string;
      'Is Discontinued By Manufacturer': string;
      OS: string;
      RAM: string;
      'Wireless communication technologies': string;
      'Connectivity technologies': string;
      GPS: string;
      'Special features': string;
      'Other display features': string;
      'Human Interface Input': string;
      'Scanner Resolution': string;
      'Other camera features': string;
      'Form Factor': string;
      Color: string;
      'Battery Power Rating': string;
      'Whats in the box': string;
      Manufacturer: string;
      'Date First Available': string;
      'Memory Storage Capacity': string;
      'Standing screen display size': string;
      'Ram Memory Installed Size': string;
      Weight: string;
    };
  };
};

type cartItems = productDetailsType & {
  count: number;
};

type storeType = {
  bestDeals: bestDealType | undefined;
  searchData: queryDataType | undefined;
  setSearchData: React.Dispatch<
    React.SetStateAction<queryDataType | undefined>
  >;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  queryFilProducts: queryProducts[];
  setQueryFilProducts: React.Dispatch<React.SetStateAction<queryProducts[]>>;
  bestFilProducts: Deal[];
  setBestFilProducts: React.Dispatch<React.SetStateAction<Deal[]>>;
  reloadBestDeals: () => Promise<void>;
  cart: cartItems[];
  addToCart: (newItem: productDetailsType) => void;
  removeFromCart: (asin: string) => void;
  product: productDetailsType | undefined;
  setProduct: React.Dispatch<React.SetStateAction<productDetailsType | undefined>>;
  productDetailsAPI: (asin: string) => Promise<void>;
  incrementCount: (cartProduct: productDetailsType) => void;
  decrementCount: (cartProduct: productDetailsType) => void;
};

export const Store = createContext<storeType>({
  bestDeals: undefined,
  searchData: undefined,
  setSearchData: () => {},
  input: '',
  setInput: () => {},
  queryFilProducts: [],
  setQueryFilProducts: () => {},
  bestFilProducts: [],
  setBestFilProducts: () => {},
  reloadBestDeals: async () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  product:undefined,
  setProduct:()=>{},
  productDetailsAPI:async()=>{},
  incrementCount:()=>{},
  decrementCount:()=>{},
});

const StoreProvider = (props: Props) => {
  const [bestDeals, setBestDeals] = useState<bestDealType>();
  const [searchData, setSearchData] = useState<queryDataType>();
  const [input, setInput] = useState('');
  const [bestFilProducts, setBestFilProducts] = useState<Deal[]>([]);
  const [queryFilProducts, setQueryFilProducts] = useState<queryProducts[]>([]);
  const [nullStorage, setNullStorage] = useState(false);
  const [cart, setCart] = useState<cartItems[]>([]);
  const [product,setProduct] = useState<productDetailsType>();

  const bestDealApi = async () => {
    const url =
      'https://real-time-amazon-data.p.rapidapi.com/deals-v2?country=US&min_product_star_rating=ALL&price_range=ALL&discount_range=ALL';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': Config.API_KEY!,
        'x-rapidapi-host': Config.API_HOST!,
      },
    };

    try {
      const value = await AsyncStorage.getItem('best-Deals');
      if (value != null) {
        setBestDeals(JSON.parse(value));
        console.log('Storage:', JSON.parse(value));
      } else {
        const response = await fetch(url, options);
        const result = await response.json();
        setBestDeals(result);
        await AsyncStorage.setItem('best-Deals', JSON.stringify(result));
        console.log('Best Deals:', result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reloadBestDeals = async () => {
    await AsyncStorage.removeItem('best-Deals');
    setNullStorage(!nullStorage);
  };

  const queryApi = async () => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${input}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': Config.API_KEY!,
        'x-rapidapi-host': Config.API_HOST!,
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setSearchData(result);
      console.log('Search:', result);
    } catch (error) {
      console.error(error);
    }
  };

  const productDetailsAPI = async(asin: string) => {
    const url =
      `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${asin}&country=US`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': Config.API_KEY!,
        'x-rapidapi-host': Config.API_HOST!,
      },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        setProduct(result);
        console.log('Product Details:', result);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (newItem: productDetailsType) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.data.asin === newItem.data.asin);

      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index].count += 1;
        return updatedCart;
      }

      return [...prevCart, {...newItem, count: 1}];
    });
  };

  const removeFromCart = (asin: string) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.data.asin === asin);

      if (index === -1) {
        return prevCart;
      }

      const updatedCart = [...prevCart];

      if (updatedCart[index].count > 1) {
        updatedCart[index].count -= 1;
      } else {
        updatedCart.splice(index, 1);
      }

      return updatedCart;
    });
  };

  const incrementCount = (cartProduct: productDetailsType) => {
    setCart(prev =>
      prev.map(item =>
        item.data.asin === cartProduct.data.asin
          ? {...item, count: item.count + 1}
          : item,
      ),
    );
  };

  const decrementCount = (cartProduct: productDetailsType) => {
    setCart(prev =>
      prev
        .map(item =>
          item.data.asin === cartProduct.data.asin
            ? {...item, count: Math.max(1, item.count - 1)}
            : item,
        )
    );
  };


  useEffect(() => {
    bestDealApi();
  }, [nullStorage]);

  useEffect(() => {
    if (input.length > 2) {
      const timeout = setTimeout(() => {
        queryApi();
      }, 1200);
      return () => clearTimeout(timeout);
    } else {
      return;
    }
  }, [input]);

  const value = {
    bestDeals,
    searchData,
    setSearchData,
    input,
    setInput,
    queryFilProducts,
    setQueryFilProducts,
    bestFilProducts,
    setBestFilProducts,
    reloadBestDeals,
    cart,
    addToCart,
    removeFromCart,
    product,
    setProduct,
    productDetailsAPI,
    incrementCount,
    decrementCount,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
