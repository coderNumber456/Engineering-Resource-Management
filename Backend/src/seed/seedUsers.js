import connectDB from "../DB/index.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";    
import mongoose from "mongoose";

dotenv.config({
  path: "./.env",
});

const usersToSeed = [
  {
    name: "manager1",
    email: "manager1@example.com",
    password: "manager1password123",
    role: "manager",
  },
  {
    name: "manager2",
    email: "manager2@example.com",
    password: "manager2password123",
    role: "manager",
  },
  {
    name: "Thor",
    email: "Thor@example.com",
    password: "Thorpassword123",
    role: "engineer",
    seniority: "mid",
    skills: ["React", "Node.js"],
    maxCapacity: 100,
    department: "IT",
  },
  {
    name: "Hulk",
    email: "Hulk@example.com",
    password: "Hulkpassword123",
    role: "engineer",
    seniority: "senior",
    skills: ["React", "Node.js,Python"],
    maxCapacity: 50,
    department: "IT",
  },
  {
    name: "John",
    email: "John@example.com",
    password: "Johnpassword123",
    role: "engineer",
    seniority: "junior",
    skills: ["React", "Node.js,Python"],
    maxCapacity: 50,
    department: "IT",
  },
  {
    name: "Ted",
    email: "Ted@example.com",
    password: "Tedpassword123",
    role: "engineer",
    seniority: "junior",
    skills: ["React"],
    maxCapacity: 100,
    department: "IT",
  },
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB connected.");

    // Clear existing users (if any)
    await User.deleteMany({});
    console.log("Existing users cleared.");

    const hashedUsers = await Promise.all(
      usersToSeed.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword }; // Replace plain password with hashed one
      })
    );

    await User.insertMany(hashedUsers);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

seedUsers();
