import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
const Product = ({ pizza }) => {
  const dispatch = useDispatch()
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const handleSize = (index) => {
    const difference = pizza.prices[index] - pizza.prices[size];
    setSize(index);
    changePrice(difference);
  };
  const handleClick =()=>{
    dispatch(addProduct({...pizza, extras,price,quantity}))
  }
  const handleChange = (e, option) => {
    const checked = e.target.checked;
    if (checked) {
      changePrice(option.price);
      setExtras([...extras, option])
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra.text !== option.text));
    }
  };
  
  const changePrice = (number) => {
    setPrice(price + number);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => {
            return (
              <div className={styles.option} key={option.text}>
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className={styles.checkbox}
                  onChange={(e) => {
                    handleChange(e, option);
                  }}
                />
                <label htmlFor={option}>{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} onChange={(e)=>setQuantity(e.target.value)} />
          <button className={styles.button} onClick={()=>handleClick()}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  
  const res = await fetch(`${process.env.HOSTNAME}/api/products/${params.id}`);
  const data = await res.json();
  return {
    props: { pizza: data },
  };
};
