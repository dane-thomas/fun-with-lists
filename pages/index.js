import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const sendRequest = async (endpoint, data) => {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      throw new Error();
    }
  } catch (err) {
    return { result: ["Something's not right"] };
  }
};

export default function Home() {
  const [result, setResult] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const method = e.currentTarget.method.value;
    const list = JSON.parse(e.currentTarget.array.value);
    let data = { list };
    if (method === "filter") {
      data = {
        list,
        arg: e.currentTarget.arg1.value,
        fnBody: e.currentTarget.body.value,
      };
    } else if (method === "reduce") {
      data = {
        list,
        arg1: e.currentTarget.arg1.value,
        arg2: e.currentTarget.arg2.value,
        fnBody: e.currentTarget.body.value,
      };
    } else if (method === "flatten") {
      data = { list };
    }

    const { result } = await sendRequest(`/api/${method}`, data);
    setResult(result);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Fun with Lists!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>Enter some values below</p>
        <form onSubmit={onSubmit}>
          <div className={styles.card}>
            <label htmlFor="array">
              <h3>Array</h3>
            </label>
            <p>Enter array as in js</p>
            <input name="array" className={styles.input}></input>
          </div>
          <div className={styles.card}>
            <label htmlFor="method">
              <h3>Method</h3>
            </label>
            <p>Select a method to use</p>
            <select name="method" className={styles.input}>
              <option value="filter">Filter</option>
              <option value="reduce">Reduce</option>
              <option value="flatten">Flatten</option>
            </select>
          </div>
          <div className={styles.card}>
            <label htmlFor="function">
              <h3>Function</h3>
            </label>
            <p>Enter a reduction/filtering function</p>
            <div>
              <label htmlFor="arg1">First arg name</label>
              <br />
              <input type="text" name="arg1" />
            </div>
            <div>
              <label htmlFor="arg2">Second arg name</label>
              <br />
              <input type="text" name="arg2" />
            </div>
            <div>
              <label htmlFor="body">Function body</label>
              <br />
              <input type="text" name="body" className={styles.input} />
            </div>
          </div>
          <input type="submit" />
        </form>

        <div className={styles.card}>
          <h3>Result</h3>
          <p>{result.toString()}</p>
        </div>
      </main>
    </div>
  );
}
