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
  delivery: string;
  product_original_price: string;
  product_price: string;
  product_photo: string;
  product_star_rating: number;
  product_num_ratings: number;
  product_title: string;
  product_url: string;
};

type queryDataType = {
  data: {
    products: [queryProducts];
  };
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
};

export const Store = createContext<storeType>({
  bestDeals: undefined,
  searchData: undefined,
  setSearchData: () => {},
  input: '',
  setInput: () => {},
  queryFilProducts:[],
  setQueryFilProducts:()=>{},
  bestFilProducts:[],
  setBestFilProducts:()=>{},
});

const StoreProvider = (props: Props) => {
  const [bestDeals, setBestDeals] = useState<bestDealType>();
  const [searchData, setSearchData] = useState<queryDataType>();
  const [input, setInput] = useState('');
  const [bestFilProducts,setBestFilProducts] = useState<Deal[]>([]);
  const [queryFilProducts, setQueryFilProducts] = useState<queryProducts[]>([]);

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
      const response = await fetch(url, options);
      const result = await response.json();
      setBestDeals(result);
      await AsyncStorage.setItem('best-Deals',JSON.stringify(result));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    bestDealApi();
  }, []);

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
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
