import { useEffect, useState } from "react";

const App = () => {
  const [todoitem, settodoitem] = useState("");
  const [todoitems, settodoitems] = useState<string[]>([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("todoitems") || "[]");
    settodoitems(savedItems);
  }, []);

  const addItem = () => {
    if (todoitem.trim() === "") return; // Prevent adding empty items
    const newTodoItems = [...todoitems, todoitem];
    settodoitems(newTodoItems);
    localStorage.setItem("todoitems", JSON.stringify(newTodoItems));
    settodoitem("");
  };

  const clearItems = () => {
    settodoitems([]);
    localStorage.removeItem("todoitems");
  };

  return (
    <div className="flex items-center justify-center bg-teal-500 h-[100vh] flex-col p-4">
      <div className="flex flex-col items-center mb-4">
        <input
          className="bg-white border border-gray-300 rounded p-2 mb-2 w-full"
          type="text"
          value={todoitem}
          placeholder="Enter a to-do item"
          onChange={(e) => settodoitem(e.target.value)}
        />
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white rounded p-2" onClick={addItem}>
            Add Item
          </button>
          <button className="bg-yellow-500 text-white rounded p-2" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        {!todoitems.length && <h1 className="text-white">No items yet</h1>}
        {todoitems.map((item, index) => (
          <h1 key={index} className="bg-white text-black p-2 m-2 rounded">{item}</h1>
        ))}
      </div>
    </div>
  );
};

export default App;
