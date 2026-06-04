import {useEffect, useState} from "react";
import axios from "../api/axios";

export default function Orders(){
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async() => {
            const res = await axios.get("/orders");
            setOrders(res.data);
        }
        fetchOrders();
    }, []);

    return(
        <div>
            <h1>Orders</h1>
            {orders.map((order)=>(
                <div key={order._id}>
                    <h3>{order.status}</h3>
                    <p>Total: ₹{order.totalAmount}</p>
                </div>
            ))}
        </div>
    );
}