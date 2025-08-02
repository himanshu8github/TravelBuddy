import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const AiPlanner = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePrompt = () => {
    if (!userInput.trim()) return;

    const newResponse = {
      question: userInput,
      answer: getAIResponse(userInput),
    };

    setResponses([...responses, newResponse]);
    setUserInput("");
  };

  // Mock Gemini-like response function
  const getAIResponse = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("mountain")) return "Here are some mountain destinations in India: Manali, Shimla, Leh, and Mussoorie.";
    if (lower.includes("holy")) return "You might like: Rishikesh, Varanasi, Haridwar, and Amritsar.";
    if (lower.includes("beach")) return "Top beaches in India: Goa, Gokarna, Kovalam, and Andaman Islands.";
    return "Sorry, I couldn't understand that. Try asking about mountains, beaches, or holy places.";
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          TravelBuddy
        </h1>
        <div className="space-x-4">
          <Button className="bg-white text-black hover:bg-purple-800" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
          <Button className="bg-white text-black hover:bg-purple-800" onClick={() => navigate("/itenary")}>
            Itinerary
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      {/* Chatbox Section */}
      <div className="pt-32 px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to TravelBuddy AI Planner</h1>
        <h2 className="text-xl font-bold mb-6 text-center">Ask your AI Travel Assistant</h2>

        <div className="flex gap-2 mb-6">
          <Input
            className="flex-grow"
            placeholder="I want to explore mountains, beach, holy places..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePrompt()}
          />
          <Button onClick={handlePrompt}>Ask</Button>
        </div>

        <div className="space-y-4">
          {responses.map((res, index) => (
            <Card key={index} className="bg-white text-black">
              <CardContent className="p-4">
                <p><strong>You:</strong> {res.question}</p>
                <p className="mt-2"><strong>AI:</strong> {res.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiPlanner;
