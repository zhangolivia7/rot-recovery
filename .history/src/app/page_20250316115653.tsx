'use client'
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [timeframe, setTimeframe] = useState("");
  const [newTask, setNewTask] = useState("");
  const [schedule, setSchedule] = useState<string>(""); // Store ChatGPT response
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Update task text
  const updateTaskText = (id: number, text: string) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text } : task)));
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Add new task when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  // Send tasks and timeframe to ChatGPT API and update schedule
  const handleSubmit = async () => {
    if (tasks.length === 0 || timeframe.trim() === "") {
      alert("Please enter tasks and a timeframe.");
      return;
    }

    setLoading(true); // Show loading state

    // Prepare message for ChatGPT
    const prompt = `Hey! I've been bedrotting and have ${timeframe} to get myself from decaying to slaying! Here's what I have to get done':\n` +
      tasks.map((task, index) => `${index + 1}. ${task.text}`).join("\n") +
      `\n\nPlease give me a structured, realistic schedule based on this timeframe. (fun, gen-z vibe)`;

    try {
      const response = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setSchedule(data.schedule); // Store response
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setSchedule("Failed to generate schedule. Try again.");
    } finally {
      setLoading(false);
    }

    // Scroll to the schedule section
    document.getElementById("next-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Section 1 */}
      <section className="h-screen flex justify-center items-center snap-start">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div>
            <h1>
              hello, <input type="text" id="helloText" />
            </h1>
          </div>
        </main>
      </section>

      {/* Section 2 */}
      <section className="h-screen flex flex-col items-center snap-start">
        <div id="sec2" className="w-full h-full flex flex-col justify-start items-center pt-0">
          <h1 className="text-3xl mt-4">so you've been rotting...</h1>
        </div>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex flex-col items-center justify-center snap-start">
        <div id="form">
          <h1 className="text-3xl">let's get back on track...</h1>

          {/* Timeframe Input */}
          <input
            className="border p-2 w-80 mt-2"
            placeholder="Timeframe (e.g., 2 hours)"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          />

          {/* To-Do List */}
          <div className="mt-4">
            <h2 className="text-lg font-bold">Enter your tasks</h2>
            <ul className="mt-3 space-y-2">
              {tasks.map(task => (
                <li key={task.id} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => updateTaskText(task.id, e.target.value)}
                    className="border-b focus:outline-none bg-transparent w-full"
                  />
                  <button onClick={() => deleteTask(task.id)} className="text-lg">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Task Input */}
          <input
            className="p-2 w-80 mt-2"
            placeholder="Add a task and hit enter"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="mt-4 p-2 rounded-md"
          >
            {loading ? "Generating..." : "That's It"}
          </button>
        </div>
      </section>

      {/* Next Section - Display Schedule */}
      <section id="next-section" className="h-screen flex justify-center items-center snap-start">
        <div className="text-center max-w-xl">
          <h1 className="text-3xl mb-4">Your Schedule</h1>
          {loading ? (
            <p className="text-lg">Generating your schedule...</p>
          ) : (
            <p className="whitespace-pre-wrap">{schedule || "Your schedule will appear here."}</p>
          )}
        </div>
      </section>
    </div>
  );
}
