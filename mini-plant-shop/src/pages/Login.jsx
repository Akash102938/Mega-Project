export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-darkGreen">
      <div className="bg-green-950/40 p-10 rounded-2xl w-80 shadow-lg">
        <h2 className="text-2xl mb-6 font-semibold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-green-900/30 border border-green-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-green-900/30 border border-green-600"
        />
        <button className="w-full bg-green-500 hover:bg-green-600 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
