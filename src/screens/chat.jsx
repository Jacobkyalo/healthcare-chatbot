import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

export default function Chat() {
  const { user, loading, logoutUser } = useAuth();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        composerPlaceholder: "Chat with Ndolo",
        botConversationDescription:
          "    Our healthcare chatbot is a conversational agent that can help you             with your health-related queries like information on diseases, symptoms, and treatments, finding a doctor or a hospital near you and also Providing tips for a healthy lifestyle.",
        botId: "f61e7022-58eb-4f9d-8d6e-d1bc5ecedd4f",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "f61e7022-58eb-4f9d-8d6e-d1bc5ecedd4f",
        webhookId: "6d8feb1d-f8f5-4a3f-a515-b10a329e5478",
        lazySocket: true,
        themeName: "prism",
        botName: "Ndolo Healthcare Chatbot",
        stylesheet:
          "https://webchat-styler-css.botpress.app/prod/6c662f70-51b2-4620-a9c0-15c06298bd86/v38425/style.css",
        frontendVersion: "v1",
        useSessionStorage: true,
        theme: "prism",
        themeColor: "#2563eb",
      });
    };
  }, []);

  return (
    <>
      <main>
        <section className="flex my-10">
          <div>
            <Link to="/">
              <h1 className="font-bold text-3xl">
                Healthcare
                <span className="text-orange-600">Chatbot</span>
              </h1>
            </Link>
            <h3 className="font-bold my-10 text-3xl">My account</h3>
            <p className="text-neutral-900 font-medium text-lg mb-4">
              <strong>Username:</strong> <span>{user?.name}</span>
            </p>
            <p className="text-neutral-900 font-medium text-lg mb-4">
              <strong>Email:</strong> <span>{user?.email}</span>
            </p>
            <div className="mt-16">
              <h3 className="font-bold text-3xl">Chat with our Chatbot</h3>
              <p className="text-neutral-900 font-medium text-lg mb-4">
                At the right bottom 👉
              </p>
            </div>

            <button
              type="button"
              disabled={loading}
              className="flex items-center gap-x-2 mt-8 rounded bg-red-600 px-4 py-2 text-base text-white"
              onClick={logoutUser}
            >
              <IoLogOutOutline size={20} />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
