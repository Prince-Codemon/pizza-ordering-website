import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {

  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      res.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: currentStatus + 1 }),
      });
      const data = await res.json();
    //   setOrderList([...data, ...orderList.filter((order) => order._id !== id)]);
     res.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Acion</th>
            </tr>
          </tbody>
          <tbody>
            {products.map((product, i) => (
              <tr className={styles.trTitle} key={i}>
                <td>
                  <Image
                    src={product.img}
                    height={50}
                    width={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>

        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {orders.map((order, i) => (
              <tr className={styles.trTitle} key={i}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => {
                      handleStatus(order._id);
                    }}
                  >
                    {" "}
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies  || " "
    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            }
        }
    }
  const productRes = await fetch(`${process.env.HOSTNAME}/api/products`);
  const orderRes = await fetch(`${process.env.HOSTNAME}/api/orders`);
  const productData = await productRes.json();
  const orderData = await orderRes.json();

  return {
    props: {
      products: productData,
      orders: orderData,
    },
  };
};

export default Index;
