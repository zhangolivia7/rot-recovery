'use client'
import { SetStateAction, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [timeframe, setTimeframe] = useState("");
  const [newTask, setNewTask] = useState("");
  const [schedule, setSchedule] = useState<string>(""); //store groqAPI response
  const [loading, setLoading] = useState<boolean>(false);

  // Update name
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  };

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

    // Prepare message for Groq
    const prompt = `Hey! You're talking to my friend ${name}, who's been bedrotting and has ${timeframe} to get back on track! Here's what ${name} has to get done':\n` +
      tasks.map((task, index) => `${index + 1}. ${task.text}`).join("\n") +
      `\n\nIn a fun, gen-z vibe, give them a structured, realistic schedule based on the current time and amount of time they have to work.`;

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
    <div className={`h-screen snap-y snap-mandatory ${name.trim() === "" ? "overflow-hidden" : "overflow-y-scroll"}`}>
      {/* Section 1 */}
      <section className="h-screen flex justify-center items-center snap-start">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div>
            <h1>
              hello, <input type="text" id="helloText" value={name} onChange={updateName} />
            </h1>
          </div>
        </main>
      </section>

      {name.trim() !== "" && (
        <>
          {/* Section 2 */}
          <section className="h-screen flex flex-col items-center snap-start">
            <div id="sec2" className="w-full h-full flex flex-col justify-start items-center pt-0">
              <svg width="724" height="509" viewBox="0 0 724 509" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M558 413L503.5 434.5L547 451L586 425L558 413Z" fill="#8A8585" />
                <circle cx="545.624" cy="378" r="25" fill="#FFE1A8" />
                <path d="M336.624 363C375.024 348.6 487.291 357 538.624 363L542.624 397C534.624 399.667 512.224 405.4 486.624 407C461.024 408.6 347.957 445 294.624 463C271.124 474.333 212.524 497 166.124 497C108.124 497 48.1241 453 50.1241 463C51.7241 471 30.7908 497 20.1241 509C12.7908 504.333 -1.4759 491.8 0.124102 479C1.7241 466.2 26.1241 437.667 38.1241 425L156.124 449C144.791 428.333 128.924 382.2 156.124 363C190.124 339 288.624 381 336.624 363Z" fill="#FFE1A8" />
                <path d="M455.601 453.39C444.301 452.836 398.096 425.701 378.624 407L412.829 390.125C421.464 391.114 453.014 384.686 455.601 396.594C458.836 411.478 493.917 434.314 524.131 436.079C554.345 437.844 558.339 448.801 544.659 456.342C530.98 463.883 469.726 454.083 455.601 453.39Z" fill="#FFE1A8" />
                <path d="M724 -9L586 425L558 413L507.5 433L3 -9H724Z" fill="#F8F2EC" fillOpacity="0.5" />
              </svg>
              <h1 className="text-3xl mt-4">so you've been rotting...</h1>
            </div>
          </section>

          {/* Section 3 */}
          <section className="h-screen flex flex-col items-center justify-center snap-start">
            <div id="form">
              <h1 className="text-3xl">let's get back on track, {name}</h1>

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
                className="border p-2 w-80 mt-2"
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
        </>
      )}
    </div>
  );
}
