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
        <h1 className="text-3xl">so you've been rotting...</h1>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex justify-center items-center snap-start">
        <h1 className="text-3xl">Third Section</h1>
      </section>
    </div>
  );
}
