import React from "react";

const EditTask = () => {
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
        {
          ...prevTasks[index],
          title: newTitle,
          description: newDescription,
        },
        ...prevTasks.slice(index + 1),
      ]);
    } catch (error) {
      toast("Error updating task");
      console.error("Error updating task: ", error);
    }
  };
  return (
    <>
      <form onSubmit={handleEditSubmit} className=" text-center w-full">
        <h1 className="text-center font-bold text-3xl mb-5">Edit Task</h1>
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
    </>
  );
};

export default EditTask;
