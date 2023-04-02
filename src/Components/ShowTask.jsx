import React, { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const ShowTask = ({ toast }) => {
  // Search Functionality
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Add Task
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleTaskExpansion = (taskId) => {
    if (taskId === expandedTaskId) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(taskId);
    }
  };

  const tasksCollectionRef = collection(db, "tasks");
  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(tasksCollectionRef);
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    };
    fetchTasks();
    console.log("useEffect");
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const taskDocRef = doc(tasksCollectionRef, taskId);
      await deleteDoc(taskDocRef);
      toast("Task deleted successfully!");
      console.log("Task deleted successfully!");

      // Remove the deleted task from the tasks state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      toast("Error deleting task");
      console.error("Error deleting task: ", error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + " ...";
    } else {
      return description;
    }
  };

  // This is for Update Task
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTitle(taskToEdit.title);
    setNewDescription(taskToEdit.description);
    setEditingTaskId(taskId);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskDocRef = doc(tasksCollectionRef, editingTaskId);
      await updateDoc(taskDocRef, {
        title: newTitle,
        description: newDescription,
      });
      setNewTitle("");
      setNewDescription("");
      setEditingTaskId(null);
      toast("Task added successfully!");

      // Find the index of the updated task in the tasks array
      const index = tasks.findIndex((task) => task.id === editingTaskId);

      // Replace the old task with the updated task in the tasks array
      setTasks((prevTasks) => [
        ...prevTasks.slice(0, index),
        { ...prevTasks[index], title: newTitle, description: newDescription },
        ...prevTasks.slice(index + 1),
      ]);
    } catch (error) {
      toast("Error updating task");
      console.error("Error updating task: ", error);
    }
  };

  return (
    <>
      {/* <h2>All Tasks</h2> */}
      <div className=" text-center my-10 px-6">
        <input
          type="text"
          className=" border px-4 py-2 rounded-xl lg:w-96 w-full "
          placeholder="Search Task posts..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="flex flex-col lg:mx-16 m-5 lg:-m-4 ">
        {tasks
          .filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task) => (
            <li key={task.id} className="list-none mt-3 p-1">
              <div className="shadow-md">
                <div className="flex item-center gap-4">
                  {editingTaskId === task.id ? (
                    <form
                      onSubmit={handleEditSubmit}
                      className=" text-center w-full"
                    >
                      <h1 className="text-center font-bold text-3xl mb-5">
                        Edit Task
                      </h1>
                      <div className=" w-full">
                        <input
                          type="text"
                          className="border border-black rounded-md p-1  lg:w-9/12"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                        />
                      </div>
                      <div className=" mt-5">
                        <textarea
                          className="border border-black rounded-md p-1 h-96 w-72 lg:w-9/12"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className=" bg-sky-500 p-2 w-32 text-white shadow-md mr-2"
                      >
                        Save
                      </button>
                      <button
                        className=" bg-red-500 p-2 w-32 text-white shadow-md ml-5"
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <h3 className="text-3xl font-semibold mb-5 mt-2">
                        {task.title}
                      </h3>
                      <div className="flex gap-5 items-center -mt-2">
                        <img
                          className="h-6"
                          src="https://cdn-icons-png.flaticon.com/512/1828/1828270.png"
                          alt=""
                          onClick={() => handleEdit(task.id)}
                        />
                        <img
                          onClick={() => handleDelete(task.id)}
                          className="h-6"
                          src="https://cdn-icons-png.flaticon.com/512/10233/10233642.png"
                          alt=""
                        />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  {editingTaskId === task.id ? (
                    ""
                  ) : (
                    <>
                      {expandedTaskId === task.id ? (
                        <p>{task.description}</p>
                      ) : (
                        <p>{truncateDescription(task.description, 300)}</p>
                      )}
                      {task.description.length > 300 && (
                        <button onClick={() => toggleTaskExpansion(task.id)}>
                          {expandedTaskId === task.id ? "See less" : "See more"}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
      </div>
    </>
  );
};

export default ShowTask;
