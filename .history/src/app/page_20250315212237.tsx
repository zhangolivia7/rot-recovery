export default function Home() {
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
      <section className="h-screen flex justify-center items-center snap-start">
        <div>
          {/* Dude with phone */}
          <svg width="586" height="156" viewBox="0 0 586 156" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M558 60L503.5 81.5L547 98L586 72L558 60Z" fill="#8A8585" />
            <circle cx="545.624" cy="25" r="25" fill="#FFE1A8" />
            <path d="M336.624 10.0001C375.024 -4.39994 487.291 4.00006 538.624 10.0001L542.624 44C534.624 46.6667 512.224 52.4 486.624 54C461.024 55.6 347.957 92 294.624 110C271.124 121.333 212.524 144 166.124 144C108.124 144 48.1241 100 50.1241 110C51.7241 118 30.7908 144 20.1241 156C12.7908 151.333 -1.4759 138.8 0.124102 126C1.7241 113.2 26.1241 84.6667 38.1241 72L156.124 96C144.791 75.3333 128.924 29.2 156.124 10.0001C190.124 -13.9999 288.624 28.0001 336.624 10.0001Z" fill="#FFE1A8" />
            <path d="M455.601 100.39C444.301 99.8356 398.096 72.7011 378.624 54L412.829 37.1246C421.464 38.1145 453.014 31.6863 455.601 43.5936C458.836 58.4778 493.917 81.3136 524.131 83.0787C554.345 84.8437 558.339 95.8006 544.659 103.342C530.98 110.883 469.726 101.083 455.601 100.39Z" fill="#FFE1A8" />
          </svg>

          <h1 className="text-3xl">so you've been rotting...</h1>
        </div>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex justify-center items-center snap-start">
        <h1 className="text-3xl">Third Section</h1>
      </section>
    </div>
  );
}
