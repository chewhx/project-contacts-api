import React from "react";
import PostContact from "../../components/PostContact";

const AddScreen = () => {
  return (
    <section id="postOne" className="container-fluid bg-white py-5">
      <div className="container py-5">
        <h1 className="text-center">Add new contact</h1>
        <PostContact />
      </div>
    </section>
  );
};

export default AddScreen;
