import { useState, useEffect, useRef } from "react";
// import axios from "axios";
import config from "./config";
import "./App.css";

async function getImages(query, page) {
  const response = await config.get(`?query=${query}&page=${page}`);
  return response.data.results;
}

function App() {
  // const [searchQuery, setSearchQuery] = useState("cat");
  const [images, setImages] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const currentRef = useRef(null);

  async function fetchData() {
    setIsLoading(true);
    setTimeout(async () => {
      const newImages = await getImages(searchInput, page);
      setIsLoading(false);
      if (newImages.length === 0) {
        return;
      }
      setImages((images) => [...images, ...newImages]);
    }, 1000);
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const currentElement = currentRef.current;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  function handleIntersection(entries) {
    if (entries[0].isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function handleClick() {
    setImages([]);
    setPage(1);
  }

  const imageContent = images.map((image) => {
    return (
      <div key={image.id} className="image-container">
        <img
          src={image.urls.thumb}
          className="image"
          alt={image.alt_description}
        />
      </div>
    );
  });
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="search-button" onClick={handleClick}>
          Search
        </button>
      </div>

      <div className="gallery">{imageContent}</div>

      {isLoading && (
        <div className="donut-container">
          <div className="donut"></div>
        </div>
      )}
      <div ref={currentRef}></div>
    </div>
  );
}

export default App;
