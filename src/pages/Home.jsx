import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import axios from "axios";

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
      {console.log(products)}
      <section className="flex flex-wrap justify-start gap-4 p-4">

        {products.map((product) => (
          <ItemCard key={product.id} name={product.product_name} initial={product.initial_price} selling={product.selling_price} image={product.product_image}/>
        ))}
        {/* <ItemCard />
        <ItemCard />
        <ItemCard /> */}
      </section>
    </>
  );
}
