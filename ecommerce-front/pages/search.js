import Center from "@/components/Center";
import Header from "@/components/Header";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Input from "@/components/Input";
import styled from "styled-components";
import axios from "axios";
import ProductsGrid from "@/components/ProductGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";
const SerachInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get("api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => setProducts(response.data));
    setIsLoading(false);
  }
  console.log(products);
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SerachInput
            value={phrase}
            onChange={(ev) => setPhrase(ev.target.value)}
            autoFocus
            placeholder="Search for products"
          />
        </InputWrapper>

        {!isLoading && phrase !== "" && products.length === 0 && (
          <h1>No products found</h1>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && phrase === "" &&(<h1>Search Products</h1>)}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
