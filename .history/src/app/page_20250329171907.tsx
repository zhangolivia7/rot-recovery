'use client'
import { SetStateAction, useState } from "react";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti-boom';

export default function Home() {
  const [name, setName] = useState("");
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
    var prompt = "";

    if (name.toLowerCase() === "leslie") {
      prompt = `ALWAYS USE <b> IF YOU NEED TO BOLD YOUR RESPONSES!!! DO NOT USE DOUBLE ASTERICKS\nHey! You're talking to my friend ${name}, who's been bedrotting and has ${timeframe} to get back on track! Here's what ${name} has to get done':\n` +
        tasks.map((task, index) => `${index + 1}. ${task.text}`).join("\n") +
        `\n\nShe REALLY likes Hatsune Miku, so pretending you're Hatsune Miku and including Hatsune Miku references, give them a structured, realistic schedule based on the current time and amount of time they have to work in this schedule format:\n[Introduction message (make sure you introduce yourself as Hatsune Miku)]\n[00:00-##:##: <b>Task</b>, bit of encouragement and tips on how to complete the task well] and repeat this structure. Here's an example: <b>[Greeting]</b>\n\nHere's your customized schedule: \n\n<b>00:00-00:30: Finish Math Homework,</b> Leslie-chan! Take a deep breath and dive into your math problems. Focus on one question at a time, and make sure you understand each concept before moving on to the next. You got this!\n\n<b>00:30-01:15: Watch Algorithms Class Lecture.</b> Take a short break to grab a snack or stretch, and then settle in to watch your lecture. Take notes on important points, and don't hesitate to pause the video if you need to review something.\n\n<b>01:15-03:00: Study for Linear Algebra Test.</b> You're almost there, Leslie-chan! Review your notes and textbook, and try to summarize key concepts in your own words. Make flashcards or create a concept map to help you visualize the material.\n\n[Closing message with Hatsune Miku references]`;
    } else {
      prompt = `ALWAYS USE <b> IF YOU NEED TO BOLD YOUR RESPONSES!!! DO NOT USE DOUBLE ASTERICKS. Hey! You're talking to my friend ${name}, who's been bedrotting and has ${timeframe} to get back on track! Here's what ${name} has to get done':\n` +
        tasks.map((task, index) => `${index + 1}. ${task.text}`).join("\n") +
        `\n\nIn a fun, chill tone, give them a structured, realistic schedule based on the current time and amount of time they have to work in this schedule format:\n[Introduction message]\n<b>00:00-##:##: Task</b>, bit of encouragement and tips on how to complete the task well. Repeat this structure. Here's an example: <b>[Greeting]</b>\n\nHere's your customized schedule:\n\n<b>00:00-00:20: History Studying,</b> Let's get that history test prep started! Focus on reviewing your notes, making flashcards, and going over any tricky dates or events. You got this, Bob!\n\n<b>00:20-00:45: English Essay Brainstorm,</b> Time to get those creative juices flowing! Take 10-15 minutes to brainstorm ideas for your essay, then organize your thoughts into an outline. Remember, a solid outline will make the writing process so much smoother!\n\n<b>00:45-01:10: Math Homework</b>, Math homework can be a real challenge, but you're almost there! Focus on one problem at a time, and don't be afraid to take breaks if you get stuck. You've got this, Bob! You're so close to finishing!\n\n<b>01:10-02:00: Write That Essay,</b> It's time to put your thoughts into words! Take your outline and start writing that essay. Remember to stay focused, and don't worry too much about grammar or spelling at this stage. Just get your ideas down on paper!\n\n[Closing message]`;
    }

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
      <section id="sec1" className="h-screen flex justify-center items-center snap-start relative overflow-hidden">
        {/* Background SVG */}
        <div className="absolute inset-0 z-0">
          <svg
            width="1441"
            height="964"
            viewBox="0 0 1441 964"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M148.646 363.552C91.0762 438.396 0 867.5 0 867.5V964H1375H1440.5V905C1401.89 678.974 1336.02 197.758 1252.35 86.2438C1144.34 -57.7212 1031.61 10.6378 952.439 62.2496C904.639 93.4101 795.141 246.205 724.357 261.701C653.573 277.197 503.312 200.592 395.08 200.592C277.106 200.592 212.53 280.5 148.646 363.552Z"
              fill="#FFE1A8"
            />
          </svg>
        </div>

        {/* Foreground content */}
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start z-10">
          <div id="s1">
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
              {name.toLowerCase() === "leslie" ? (
                // Special SVG for Leslie
                <svg width="724" height="509" viewBox="0 0 724 509" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M495 354.5C491.4 354.5 469.167 355.833 458.5 356.5L460 359L528.5 363L525.5 359C516.833 357.5 498.6 354.5 495 354.5Z" fill="#88D0C7" />
                  <path d="M558 413L503.5 434.5L547 451L586 425L558 413Z" fill="#8A8585" />
                  <circle cx="545.624" cy="378" r="25" fill="#FFE1A8" />
                  <path d="M336.624 363C375.024 348.6 487.291 357 538.624 363L542.624 397C534.624 399.667 512.224 405.4 486.624 407C461.024 408.6 347.957 445 294.624 463C271.124 474.333 212.524 497 166.124 497C108.124 497 48.1241 453 50.1241 463C51.7241 471 30.7908 497 20.1241 509C12.7908 504.333 -1.4759 491.8 0.124102 479C1.7241 466.2 26.1241 437.667 38.1241 425L156.124 449C144.791 428.333 128.924 382.2 156.124 363C190.124 339 288.624 381 336.624 363Z" fill="#FFE1A8" />
                  <path d="M455.601 453.39C444.301 452.836 398.096 425.701 378.624 407L412.829 390.125C421.464 391.114 453.014 384.686 455.601 396.594C458.836 411.478 493.917 434.314 524.131 436.079C554.345 437.844 558.339 448.801 544.659 456.342C530.98 463.883 469.726 454.083 455.601 453.39Z" fill="#FFE1A8" />
                  <path d="M529 359C505.167 359.167 455.8 360.1 449 362.5C440.5 365.5 408.5 380.5 403 386.5C397.5 392.5 387.5 398 385.5 406C383.9 412.4 384.833 415.333 385.5 416C381.167 412.5 372.8 404.1 374 398.5C375.423 391.858 379.997 387.017 382.597 386.539C380.62 386.631 375.704 386.944 375 388C374.2 389.2 373.333 390.833 373 391.5C373.167 386.667 374.9 376.1 380.5 372.5C387.5 368 403.5 358.5 417 357C430.5 355.5 463 353 473.5 353C484 353 521.5 357 524 357C526 357 528.167 358.333 529 359Z" fill="#88D0C7" />
                  <path d="M550 371.5C553.2 374.3 558.667 374.667 561 374.5L554 369.5L541 362H550C548 361 543 359 539 359C535 359 529.167 360.5 526.5 361.5C525.667 360.5 523.5 359 525.5 359C528 359 534.5 352.5 541 351.5C547.5 350.5 557 353 561 355C564.2 356.6 567.167 361 567.5 364C568.333 364.5 569 368.3 571 371.5C573.5 375.5 567 396 566 397C565 398 547.5 406.5 544 406.5C540.5 406.5 436.5 434 411 446C385.5 458 297 481.5 291.5 481C287.1 480.6 276.333 476.5 271.5 474.5C275.667 475.5 284.7 476.7 287.5 473.5C290.3 470.3 305.667 466.167 313 464.5H301C295 464.5 287.167 470.5 284 473.5C285.5 471 289.1 465.7 291.5 464.5C293.9 463.3 303.833 457.667 308.5 455C312 454.833 320.8 453.6 328 450C337 445.5 433 410.5 454.5 406.5C471.7 403.3 512.333 398.833 530.5 397C535 398.5 545.2 401.5 550 401.5C553.076 401.5 557.203 399.266 560.091 397.493C558.356 397.618 556.601 396.675 554 397C550.8 397.4 544 391.167 541 388H550C554.8 388 559.333 385.667 561 384.5C558.167 383.333 552 380.6 550 379C548 377.4 545.167 368.333 544 364C544.667 365.333 546.8 368.7 550 371.5Z" fill="#88D0C7" />
                  <path d="M724 -9L586 425L558 413L507.5 433L3 -9H724Z" fill="#F8F2EC" fill-opacity="0.5" />
                  <path d="M531.5 350L529 360.5L526 362L527.5 348L531.5 350Z" fill="#9C4066" />
                  <path d="M543 411.5L530 397.5V397L525.5 397.5L535 408.5L531 409.5L534 411.5H543Z" fill="#9C4066" />
                </svg>
              ) : (
                // Default SVG
                <svg width="724" height="509" viewBox="0 0 724 509" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M558 413L503.5 434.5L547 451L586 425L558 413Z" fill="#8A8585" />
                  <circle cx="545.624" cy="378" r="25" fill="#FFE1A8" />
                  <path d="M336.624 363C375.024 348.6 487.291 357 538.624 363L542.624 397C534.624 399.667 512.224 405.4 486.624 407C461.024 408.6 347.957 445 294.624 463C271.124 474.333 212.524 497 166.124 497C108.124 497 48.1241 453 50.1241 463C51.7241 471 30.7908 497 20.1241 509C12.7908 504.333 -1.4759 491.8 0.124102 479C1.7241 466.2 26.1241 437.667 38.1241 425L156.124 449C144.791 428.333 128.924 382.2 156.124 363C190.124 339 288.624 381 336.624 363Z" fill="#FFE1A8" />
                  <path d="M455.601 453.39C444.301 452.836 398.096 425.701 378.624 407L412.829 390.125C421.464 391.114 453.014 384.686 455.601 396.594C458.836 411.478 493.917 434.314 524.131 436.079C554.345 437.844 558.339 448.801 544.659 456.342C530.98 463.883 469.726 454.083 455.601 453.39Z" fill="#FFE1A8" />
                  <path d="M724 -9L586 425L558 413L507.5 433L3 -9H724Z" fill="#F8F2EC" fillOpacity="0.5" />
                </svg>
              )}
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
          {schedule && (
            <section id="next-section" className="h-screen flex justify-center items-center snap-start">
              <div className="text-center max-w-xl">
                <h1 className="text-3xl mb-4">your schedule</h1>
                {loading ? (
                  <p className="text-lg">Generating your schedule...</p>
                ) : (
                  <p
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: schedule || "Your schedule will appear here." }}
                  />
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
