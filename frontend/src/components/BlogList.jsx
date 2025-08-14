import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // const filteredBlogs = () => {
  //   // Show only published blogs
  //   let filtered = blogs.filter((blog) => blog.isPublished);

  //   // 1. If input is empty, return the full blogs list without filtering
  //   if (input === "") {
  //     return blogs;
  //   }
  //   // 2. Otherwise, filter blogs where title or category includes the input string
  //   return blogs.filter(
  //     (blog) => (blog) =>
  //       // Check if the blog's title contains the input (case-insensitive)
  //       blog.title.toLowerCase().includes(input.toLowerCase()) ||
  //       // OR check if the blog's category contains the input (case-insensitive)
  //       blog.category.toLowerCase().includes(input.toLowerCase())
  //   );
  // };

  const filteredBlogs = () => {
    // Show only published blogs
    let filtered = blogs.filter((blog) => blog.isPublished);

    // If input is empty, return all published blogs
    if (input === "") {
      return filtered;
    }

    // Otherwise, filter published blogs by title or category
    return filtered.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button onClick={() => setMenu(item)}>{item}</button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => (menu === "All" ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
