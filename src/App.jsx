import { useEffect, useState } from "react";
import "./App.css";
import { ProductContext } from "./context/ProductContext";
import ProductList from "./components/ProductList";
import NewProductForm from "./components/NewProductForm";
import { Routes, Route } from "react-router";
import NavBar from "./components/common/NavBar";
import Home from "./components/Home";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  function handleCreate(formData) {
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "content-type": "Application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to send data");
        }
        return res.json();
      })
      .then((newProduct) => {
        setData((prevData) => [...prevData, newProduct]);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to delete");
        }
        return res.json();
      })
      .then(() =>
        setData((prevData) => prevData.filter((product) => product.id !== id)),
      )
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <ProductContext value={{ data, setData, handleCreate, handleDelete }}>
        <NavBar />
        {loading && <p>loading...</p>}
        {error && <p>{error}</p>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/sell" element={<NewProductForm />} />
        </Routes>
      </ProductContext>
    </div>
  );
}

export default App;
