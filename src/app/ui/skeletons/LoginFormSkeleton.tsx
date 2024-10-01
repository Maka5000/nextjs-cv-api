export default function LoginFormSkeleton() {
  return (
    <div className="border-2 rounded-xl w-full max-w-80 p-3 flex flex-col gap-7 animate-pulse">
      <div>
        <div className="bg-gray-400 rounded w-full max-w-24 h-10 mx-auto"></div>
        <div className="bg-gray-400 rounded w-full max-w-36 h-10 mx-auto"></div>
      </div>
      <div className="bg-gray-300 rounded w-full h-10"></div>
      <div className="bg-gray-300 rounded w-full h-10"></div>
      <div className="bg-gray-300 rounded w-full max-w-40 h-10 mx-auto"></div>
    </div>
  );
}
