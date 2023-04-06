import { TodoList } from "./components/TodoList";
import { useState } from "react";
import { TODO_ABI, TODO_CONTRACT_ADDRESS } from "./config";
import './App.css'
import Web3 from "web3"

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [walletAccount, setWalletAccount] = useState("");
  const [contract, setContract] = useState("");


  const connectWallet = async () => {
    try {
      // Check if Metamask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Connect to local Ganache node
        const web3 = new Web3('http://localhost:7545');
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletAccount(accounts[0])
        let todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
        setContract(todoContract)

        // Set connected status and web3 instance
        setIsConnected(true);
        setWeb3(web3);
      } else {
        // Metamask is not installed
        alert('Please install Metamask to connect.');
      }
    } catch (error) {
      console.error(error);
    }

  };

  const createTodo = async () => {
    console.log("createTodo")
    console.log(walletAccount)
    // const todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
    await contract.methods.createTodo("test 4").send({ from: walletAccount })
  }
  const getTodo = async () => {
    console.log("getTodo")
    // const todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
    let id = await contract.methods.todoCount().call()
    let temp = await contract.methods.todos(id).call()
    console.log(temp)
  }


  const getAllTodos = async () => {
    console.log("getAllTodos")
    let todoCount = await contract.methods.todoCount().call()
    for (let i = 1; i <= todoCount; i++) {
      let todo = await contract.methods.todos(i).call()
      if (todo["id"] != 0) {
        console.log(todo)
        // html += ""
      }
    }
  }

  const getCount = async () => {
    console.log("getCount")
    // const todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
    let temp = await contract.methods.todoCount().call()
    console.log(temp)

  }
  const deleteTodo = async () => {
    console.log("deleteTodo")
    console.log(walletAccount)
    // const todoContract = new web3.eth.Contract(TODO_ABI, TODO_CONTRACT_ADDRESS);
    await contract.methods.removeTodo(2).send({ from: walletAccount })
  }
  const printInfo = async () => {
    console.log(walletAccount)
  }



  return (
    // connect account button
    <div className="App">

      <button id="metaBtn" className="buttons" onClick={connectWallet}>Connect Meta Mask</button>
      <button id="createTodo" className="buttons" onClick={createTodo}>Create Todo</button>
      <button id="getTodo" className="buttons" onClick={getTodo}>Get Todo</button>
      <button id="getAllTodos" className="buttons" onClick={getAllTodos}>Get all todos</button>
      <button id="getCount" className="buttons" onClick={getCount}>Get Count</button>
      <button id="deleteTodo" className="buttons" onClick={deleteTodo}>Delete Todo</button>
      <button id="printInfo" className="buttons" onClick={printInfo}>printInfo</button>
      {/* <p>{walletAddress}</p> */}
      <TodoList />
    </div>
  );
}

export default App;


//kolla LP contract for PoolCreated