import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "./Card";
import { useAuth } from "./AuthContext";

function Otherprofile() {
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(`https://artfolio-y03z.onrender.com/api/user/getuser/${params.username}`)
      .then((res) => {
        if (res.data.user) {
          setUserData(res.data.user);
        } else {
          setUserData({});
        }
      });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 bg-[#c6ffdd]">
      {/* Profile Photo and Follow Button */}
      {userData && (
        <>
          <div className="text-center">
            {userData.userdata && (
              <>
                <img
                  className="h-32 w-32 rounded-full mx-auto mb-4"
                  src={
                    "https://artfolio-y03z.onrender.com/images/avtar/" +
                    userData.userdata.image
                  }
                  alt="Profile"
                />
                <h1 className="text-2xl font-semibold">
                  {userData.userdata.username}
                </h1>
              </>
            )}
          </div>

          {/* Image Upload Section */}
          {userData.userPostData && (
            <>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Uploaded Arts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Replace with a map function to generate responsive photo cards */}
                  {/* Example card */}
                  {userData.userPostData.map((post, index) => {
                    return (
                      <Card
                        username={userData.userdata.username}
                        image={
                          "https://artfolio-y03z.onrender.com/images/post/" + post.postimage
                        }
                        likes={post.likes.length}
                        avtar={
                          "https://artfolio-y03z.onrender.com/images/avtar/" + post.avtar
                        }
                        mainUser={isLoggedIn.username}
                        liked={post.likes.includes(isLoggedIn.username)}
                        postid={post._id}
                        title={post.posttitle}
                      />
                    );
                  })}
                  {/* End of example card */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Otherprofile;
