export default function Home() {
  return (
    <div className="container mx-auto min-h-screen flex place-content-center">
      <div
        className={`
            max-w-80 
            m-auto 
            text-center 
            border-solid 
            border-2 
            rounded-xl 
            p-3
            `}
      >
        <h1 className="text-5xl font-bold mb-12">CV API Dashboard</h1>
        <div className="flex flex-col justify-between mb-5 gap-7">
          <input
            type="text"
            placeholder="username"
            className="p-2 border-solid border-2 rounded"
          />
          <input
            type="text"
            placeholder="password"
            className="p-2 border-solid border-2 rounded"
          />
        </div>
        <button
          type="button"
          className={`
              border-solid 
              rounded-md 
              border-transparent 
              px-5 
              py-2
              bg-blue-500 
              text-white
              text-3xl
              hover:bg-blue-800
              transition-colors
              `}
        >
          Login
        </button>
      </div>
    </div>
  );
}
