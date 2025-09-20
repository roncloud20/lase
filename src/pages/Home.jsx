import axios from "axios";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{

    const fetchData = async () => {
      const response = await axios.get('http://lasestore.test/api/allproduct');
      setProducts(response.data.products);
    }

    fetchData();
  }, [])
  return (
    <>
      <Header />
      <h1>Hello Welcome</h1>
      <section className="flex flex-wrap justify-start gap-4 p-4">

        {products.map((product) => (
          <ItemCard key={product.product_id} id={product.product_id} name={product.product_name} initial={product.initial_price} selling={product.selling_price} image={product.product_image}/>
        ))}
      </section>
    </>
  );
}
