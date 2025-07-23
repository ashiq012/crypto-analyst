import { createContext ,useEffect,useState } from "react"
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin , setAllCoin] = useState([]);
    const [coin , setCoin] = useState({
        name : "usd",
        symbol : "$"
    })

    const fetchAllCoin = async () => {
        const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kPJNrDRExbKXHtof8UGr4zAg'}
                    };

            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${coin.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
        }
    
        useEffect(()=>{
           fetchAllCoin() 
        },[allCoin])
    const ConextValue = {
        allCoin , coin , setCoin
    }
    return (
        <CoinContext.Provider value={ConextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider ;