import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white text-nord-0 flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Cafe Order System</h1>
      <p className="max-w-xl text-lg mb-6">
         A modern, multi-role restaurant management system built with React, Vite, TailwindCSS, and ShadCN UI, featuring admin, waiter, cashier, and client interfaces. This app allows seamless ordering, employee management, and performance tracking through a clean and interactive dashboard.
      </p>
      <div className="bg-nord-4 border border-nord-3 p-4 rounded-md mb-6 text-sm text-left max-w-md w-full text-nord-0">
        <p className="font-semibold mb-1 text-nord-2">🧪 Test Login Credentials:</p>
        <p><span className="font-medium">Username:</span> <code className="bg-nord-6 px-1 rounded">admin</code></p>
        <p><span className="font-medium">Password:</span> <code className="bg-nord-6 px-1 rounded">password</code></p>
      </div>
      <Link
        to="/login"
        className="bg-nord-10 hoveh:bg-nord-12 text-white px-6 py-3 rounded-lg text-md transition"
      >
        Go to Login
      </Link>
    </main>
  );
}
