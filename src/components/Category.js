import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useAuth } from "./AuthContext";
import axios from "axios";

function Category() {
  const [allPost, setAllPost] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    axios.get("https://artfolio-y03z.onrender.com/api/post/getallpost").then((res) => {
      if (res.data.posts) {
        setAllPost(res.data.posts);
        setFiltered(res.data.posts);
      } else {
        setAllPost([]);
      }
    });
  }, []);
  const handleCategory = (param) => {
    axios
      .get(`https://artfolio-y03z.onrender.com/api/post/getallpost/${param}tag`)
      .then((res) => {
        if (res.data.posts) {
          setAllPost(res.data.posts);
          setFiltered(res.data.posts);
        } else {
          setAllPost([]);
        }
      });
  };
  const handleSearchByName = (e) => {
    if (allPost) {
      if (e.target.value === "") {
        setAllPost(filtered);
      } else {
        const filteredData = allPost.filter((data) => {
          return data.posttitle
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
        setAllPost(filteredData);
      }
    }
  };
  return (
    <div className="mt-16" style={{  backgroundColor: 'white', // Set your desired gradient background
    padding: "10px",userSelect: "none" }}>
      <h1 className="text-2xl font-semibold sm:text-5xl sm:font-bold text-center mb-3 sm:mb-10">
        Go through our beautiful arts
      </h1>
      <div className="flex items-center justify-center mb-10">
        <input
          type="text"
          name="search"
          className="text-xl sm:text-3xl font-bold w-9/12 sm:w-10/12 border-2 border-[#4dc47d]  rounded-lg ps-10 sm:ps-10 sm:p-2  focus:border-[#4dc47d] focus:border-2"
          placeholder="Search..."
          onChange={handleSearchByName}
        />
      </div>
      <div className="categories flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-1/2">
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("technology")}
          >
            Digital Art  
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("art")}
          >
            Paintings
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("lifestyle")}
          >
            Photography
          </button>
          <button
            className="bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD] text-white font-bold py-2 px-4 rounded gradient-transition"
            onClick={() => handleCategory("nature")}
          >
            Sculptures
          </button>
        </div>
      </div>
      <div
        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16 bg-[#ab3636] p-10"
        style={{ background: 'linear-gradient(to right, #d3cce3, #e9e4f0)', // Set your desired gradient background
        padding: "15px", margin: "10px",userSelect: "none" }}
      >
        {allPost ? (
          <>
            {allPost.map((data, index) => {
              return (
                <div key={index}>
                  <Card
                    username={data.username}
                    image={
                      "https://artfolio-y03z.onrender.com/images/post/" + data.postimage
                    }
                    likes={data.likes.length}
                    avtar={"https://artfolio-y03z.onrender.com/images/avtar/" + data.avtar}
                    mainUser={isLoggedIn.username}
                    liked={data.likes.includes(isLoggedIn.username)}
                    postid={data._id}
                    title={data.posttitle}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Category;
