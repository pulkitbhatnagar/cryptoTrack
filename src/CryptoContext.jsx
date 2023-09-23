import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './Pages/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from './Pages/Firebase';
import axios from 'axios';
import { CoinList } from './config/service';
import { data } from './mockData';

let Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR');
    const [symbol, setSymbol] = useState('₹');
    const [alert, setAlert] = useState({});
    const [user, setUser] = useState('');
    const [watchList, setWatchList] = useState([]);
    let [coins, setCoins] = useState([]);
    let [loading, setLoading] = useState();

    async function fetchCoins() {
        try {
            setLoading(true);
            let tableData = await axios(CoinList(currency));
            setCoins(tableData.data);
        } catch (e) {
            setCoins(data);
        }
    }

    useEffect(() => {
        if (coins.length > 0) {
            setLoading(false);
        }
    }, [coins]);

    useEffect(() => {
        fetchCoins();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, 'watchlist', user.uid);

            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    
                    setWatchList(coin.data().coins);
                } else {
                    console.log('no coin presennt');
                }
            });
            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    useEffect(() => {
        if (currency === 'INR') {
            setSymbol('₹');
        } else {
            setSymbol('$');
        }
    }, [currency]);

    return (
        <Crypto.Provider
            value={{
                currency,
                symbol,
                setCurrency,
                alert,
                setAlert,
                user,
                watchList,
                coins,
                loading,
                setWatchList,
            }}
        >
            {children}
        </Crypto.Provider>
    );
};
export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};
