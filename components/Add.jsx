import React, { useState } from "react";
import styles from "../styles/AddButton.module.css";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  const router = useRouter();
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [prices, setPrices] = useState([]);
  const [desc, setDesc] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState();

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e;
    setPrices(currentPrices);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dzi7fmfoz/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await uploadRes.json();
      const { url } = file;
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          prices,
          extraOptions,
          img: url,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await res.json();
      

      res.status === 201 && (router.push("/admin"), setClose(true));
    } catch (error) {}
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };
  const handleExtra = (e) => {
    e.preventDefault();
    setExtraOptions([...extraOptions, extra]);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span
          onClick={() => {
            setClose(true);
          }}
          className={styles.close}
        >
          X
        </span>
        <h1 className={styles.title}>Add Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Photo</label>
          <input
            className={styles.input}
            type="file"
            placeholder="Name"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="title"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className={styles.item} id="prices">
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              name="small"
              onChange={(e) => {
                changePrice(e.target.value, 0);
              }}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              name="medium"
              onChange={(e) => {
                changePrice(e.target.value, 1);
              }}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              name="large"
              onChange={(e) => {
                changePrice(e.target.value, 2);
              }}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra Options</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.addButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((item, index) => {
              return (
                <span className={styles.extraItem} key={index}>
                  <span>{item.text}</span>
                  <span>{item.price}</span>
                </span>
              );
            })}
          </div>
        </div>
        <button className={styles.button} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
