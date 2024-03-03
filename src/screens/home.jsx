import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <h1 className="text-3xl font-bold text-center mt-8">
          Welcome to Healthcare chatbot
        </h1>
      </main>
    </div>
  );
}
