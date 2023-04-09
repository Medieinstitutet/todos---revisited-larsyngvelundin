import { useState, useEffect } from "react";
import MetamaskButton from "./components/MetamaskButton";
import { TodoList } from "./components/TodoList";
import { TODO_ABI, TODO_CONTRACT_ADDRESS } from "./config";

function App() {
  const [web3, setWeb3] = useState(null);
  const [connectedAccount, setConnectedAccount] = useState([]);
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState("");

  useEffect(() => {
    if (connected && web3) {
      let todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
      setContract(todoContract)
    }
  }, [connected]);

  return (
    <div className="App">
      <MetamaskButton
        web3={web3}
        setWeb3={setWeb3}
        connectedAccount={connectedAccount}
        setConnectedAccount={setConnectedAccount}
        connected={connected}
        setConnected={setConnected}
      />
      <TodoList
        contract={contract}
        connectedAccount={connectedAccount}
        connected={connected}
      />
    </div>
  );
}

export default App;