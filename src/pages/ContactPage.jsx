import { useState } from "react";
import { Mail, Phone } from "lucide-react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Clear previous status
    setLoading(true);

    // Basic validation
    if (!name || !email || !message) {
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://forms.suitepreferences.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("success");
        // Clear form fields on success
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate">
      <div className="container mx-auto px-4 py-12 max-w-3xl rounded-xl my-12 bg-gray-800 shadow-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          <Mail className="inline-block h-10 w-10 text-ns-light-blue mr-3 align-middle" />
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-300 mb-8">We'd love to hear from you! Please fill out the form below to get in touch.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 border-gray-600 text-white p-3"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 border-gray-600 text-white p-3"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 border-gray-600 text-white p-3"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Send Message"}
          </button>

          {status && (
            <div className={`text-center p-3 rounded-md mt-4 ${status === "success" ? "bg-green-800 text-green-200" : "bg-red-800 text-red-200"}`}>
              {status === "success" ? "Your message has been sent successfully!" : "Failed to send message. Please try again."}
            </div>
          )}
        </form>

        <div className="mt-12 text-center text-gray-300">
          <h3 className="text-xl font-bold mb-4 text-white">Other Ways to Reach Us</h3>
          <p className="flex items-center justify-center mb-2">
            <Phone className="h-5 w-5 mr-2 text-indigo-400" /> +1 (512) 677-9899
          </p>
          <p className="flex items-center justify-center mb-2">
            <Mail className="h-5 w-5 mr-2 text-indigo-400" />{" "}
            <a href="mailto:info@suitepreferences.com" className="hover:underline text-indigo-400">
              info@suitepreferences.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
