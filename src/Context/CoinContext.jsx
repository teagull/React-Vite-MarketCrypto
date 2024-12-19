import { createContext, useState, useEffect } from "react";

// Criação do contexto
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    // Função para buscar dados da API
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-1Gkby6gesT3sNNE3xTYNasNM' }
        };

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, 
                options
            );
            const data = await response.json();
            setAllCoin(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Chamada da API sempre que a moeda mudar
    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    // Valores do contexto
    const contextValue = {
        allCoin,
        currency,
        setCurrency,
    };

    // Retorna o Provider com o valor do contexto
    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
