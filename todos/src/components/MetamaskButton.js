import { useEffect } from "react";
import Web3 from "web3";

const MetamaskButton = ({ setWeb3, connectedAccount, setConnectedAccount, connected, setConnected }) => {

    const connectToMetamask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                setConnected(true)
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        async function checkMetamaskConnection() {
            if (window.ethereum) {
                const temp_web3 = await new Web3(window.ethereum);
                setWeb3(temp_web3)
                try {
                    const accounts = await temp_web3.eth.getAccounts();
                    if (accounts.length > 0) {
                        setConnectedAccount(accounts[0]);
                        setConnected(true)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        checkMetamaskConnection();
    }, [connected]);

    if (connected) {
        return <p>Connected with account: {connectedAccount}</p>;
    } else {
        return (
            <button onClick={connectToMetamask}>Connect with Metamask</button>
        );
    }
};

export default MetamaskButton;