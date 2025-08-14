import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Admin from "../models/Admin.js";

import Comment from "../models/Comment.js";

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // add name

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = new Admin({ name, email, password }); // include name
    await newAdmin.save();

    const token = jwt.sign(
      { _id: newAdmin._id, email, name }, // optionally include name in token payload
      process.env.JWT_SECRET
    );

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    if (admin.password !== password) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { _id: admin._id, email, name: admin.name }, // include name here
      process.env.JWT_SECRET
    );

    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    // Find blog IDs owned by the logged-in admin
    const myBlogs = await Blog.find({ author: req.user._id }).select("_id");
    const myBlogIds = myBlogs.map((blog) => blog._id);

    // Find comments only on those blogs
    const comments = await Comment.find({ blog: { $in: myBlogIds } })
      .populate("blog", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    // Find the comment and populate the blog author
    const comment = await Comment.findById(id).populate("blog");

    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    // Check if the logged-in admin owns the blog
    if (comment.blog.author.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;

    const comment = await Comment.findById(id).populate("blog");

    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    if (comment.blog.author.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Comment.findByIdAndUpdate(id, { isApproved: true });

    res.json({
      success: true,
      message: "Comment approved successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    // Find recent blogs only of this admin
    const recentBlogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    // Count total blogs by this admin
    const blogs = await Blog.countDocuments({ author: req.user._id });

    // Count comments ONLY on this admin's blogs
    // First get admin's blog IDs
    const myBlogs = await Blog.find({ author: req.user._id }).select("_id");
    const myBlogIds = myBlogs.map((blog) => blog._id);

    // Count approved comments on these blogs
    const comments = await Comment.countDocuments({ blog: { $in: myBlogIds } });

    // Count drafts by this admin
    const drafts = await Blog.countDocuments({
      author: req.user._id,
      isPublished: false,
    });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
