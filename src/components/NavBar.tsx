export default function NavBar() {
  return (
    <div
      className={`
    min-h-screen 
    bg-blue-500 
    w-full 
    max-w-72 
    text-center py-10
    text-white
    `}
    >
      <h1 className="text-5xl font-bold">CV API</h1>
      <nav>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
        </ul>
      </nav>
    </div>
  );
}
