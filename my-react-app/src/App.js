import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';

function App() {

    const [contract, setcontract] = useState();
    const [todoCount, setTodoCount] = useState(0);
    const [inputItem, setInputItem] = useState();
    const [inputListItem, setInputListItem] = useState()
    const [inputListItemRes, setInputListItemRes] = useState()



    const contractExecution = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getsigner();
        const Contract = new ethers.Contract("0xa63fC0981dE0cdC2838feE7522ccdB13254Af281", abi, signer)
        Contract(Contract)
    }


    const getTodoCount = async () => {
        if (contract) {
            const res = await contract.count();
            setTodoCount(Number(res))
        }
    }

    useEffect(() => {
        contractExecution();
    }, [])

    const handleChange = (e) => {
        setInputItem(e.target.value)
    }

    const handlesubmit = async () => {
        const res = await contract.getTodo(inputItem);
    }
    const handleGetTodolist = async () => {
        const res = await contract.todoList(inputListItem);
        setInputListItemRes(res);
    }
    const handleTodoList = (e) => {
        setInputListItem(e.target.value);
    }



    return (
        <div>
            <button onclick={getTodoCount}>Get the count</button>
            <h1>Count of todo :- {todoCount}</h1>
            <div>
                Enter the Input Value
                <input onChange={handleChange}></input>
                <button onclick={handlesubmit}>Submit</button>
            </div>
            <div>
                <input onChange={handleTodoList}></input>
                <button onClick={handleGetTodolist}>Get todoList</button>
                <h3>{inputListItemRes}</h3>
            </div>
        </div>
    )
}
export default App