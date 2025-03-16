'use client'
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState("");
  const [timeframe, setTimeframe] = useState("");

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
          {/* SVG */}
          <svg width="724" height="509" viewBox="0 0 724 509" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-auto">
            <path d="M558 413L503.5 434.5L547 451L586 425L558 413Z" fill="#8A8585" />
            <circle cx="545.624" cy="378" r="25" fill="#FFE1A8" />
            <path d="M336.624 363C375.024 348.6 487.291 357 538.624 363L542.624 397C534.624 399.667 512.224 405.4 486.624 407C461.024 408.6 347.957 445 294.624 463C271.124 474.333 212.524 497 166.124 497C108.124 497 48.1241 453 50.1241 463C51.7241 471 30.7908 497 20.1241 509C12.7908 504.333 -1.4759 491.8 0.124102 479C1.7241 466.2 26.1241 437.667 38.1241 425L156.124 449C144.791 428.333 128.924 382.2 156.124 363C190.124 339 288.624 381 336.624 363Z" fill="#FFE1A8" />
            <path d="M455.601 453.39C444.301 452.836 398.096 425.701 378.624 407L412.829 390.125C421.464 391.114 453.014 384.686 455.601 396.594C458.836 411.478 493.917 434.314 524.131 436.079C554.345 437.844 558.339 448.801 544.659 456.342C530.98 463.883 469.726 454.083 455.601 453.39Z" fill="#FFE1A8" />
            <path d="M724 -9L586 425L558 413L507.5 433L3 -9H724Z" fill="#F8F2EC" fill-opacity="0.5" />
          </svg>

          {/* Text */}
          <h1 className="text-3xl mt-4">so you've been rotting...</h1>
        </div>
      </section>


      {/* Section 3 */}
      <section className="h-screen flex snap-start">
        <div id="form">
          <h1 className="text-3xl">let's get back on track...</h1>
          <textarea
            className="border p-2 w-80 h-32"
            placeholder="Enter tasks..."
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
          />
          <input
            className="border p-2 w-80 mt-2"
            placeholder="Timeframe (e.g., 2 hours)"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          />
        </div>
      </section>
    </div>
  );
}
