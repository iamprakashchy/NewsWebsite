import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="rounded-lg bg-white/20 backdrop-blur-lg p-8 text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-white">
          News Archives Coming Soon
        </h1>
        <p className="mt-4 text-lg text-white">
          We're working hard to bring you something amazing.
        </p>
        <div className="mt-8">
          <a
            href="#"
            className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 hover:bg-white/80"
          >
            Notify Me
          </a>
        </div>
      </div>
    </div>
  );
}
