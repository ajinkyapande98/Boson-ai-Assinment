import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function AddTask({ toast }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tasksCollection = collection(db, "tasks");

  // Function to add a new task to Firestore
  const addTaskToFirestore = async (title, description) => {
    try {
      const newTask = {
        title: title,
        description: description,
        createdAt: new Date(),
      };
      await addDoc(tasksCollection, newTask);
      toast("Task added successfully!");
    } catch (error) {
      toast("Error adding task!");
      console.error("Error adding task: ", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the function to submit the form data to Firestore
    if (title === "" || description.length === "") {
      toast("Task and Description Can't be Empty");
      return;
    }
    addTaskToFirestore(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center mt-16 border">
        <h1 className=" text-2xl absolute mb-5 font-bold">Add Task Here</h1>
        <div className=" sm:w-96 md:w-96 lg:w-96 shadow-xl m-2 p-16 rounded-lg mt-10">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Task:
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Task...."
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            className="border rounded w-full h-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your Description...."
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className=" text-center">
            <button
              type="submit"
              className=" mt-5 rounded-lg border bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddTask;
