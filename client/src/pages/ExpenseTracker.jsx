import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const ExpenseTracker = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("added");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddExpense = () => {
    if (!name || !amount || !type) return;
    const newExpense = {
      name,
      amount: parseFloat(amount),
      description,
      type,
    };
    setExpenses([newExpense, ...expenses]);
    setName("");
    setAmount("");
    setDescription("");
    setType("added");
  };

  const totalAdded = expenses
    .filter((e) => e.type === "added")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSpent = expenses
    .filter((e) => e.type === "spent")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10">
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          TravelBuddy
        </h1>
        <div className="space-x-4">
          <Button
            className="bg-white text-black hover:bg-purple-800"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 px-6 max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Travel Expense Tracker
        </h2>

        {/* Form */}
        <Card className="bg-white text-black">
          <CardContent className="p-4 grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Who?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Input
                placeholder="Lunch, hotel booking, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added">Added</SelectItem>
                  <SelectItem value="spent">Spent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button
                className="bg-purple-700 text-white w-full"
                onClick={handleAddExpense}
              >
                Add Expense
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="flex justify-between bg-purple-900 text-white p-4 rounded-lg shadow">
          <div>
            <h3 className="text-lg font-semibold">Total Added</h3>
            <p>₹{totalAdded.toFixed(2)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Spent</h3>
            <p>₹{totalSpent.toFixed(2)}</p>
          </div>
        </div>

        {/* Columns: Added & Spent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Added */}
          <div>
            <h3 className="text-xl font-semibold mb-2">💰 Who Added Money</h3>
            <div className="space-y-4">
              {expenses
                .filter((e) => e.type === "added")
                .map((exp, idx) => (
                  <Card key={idx} className="bg-green-800 text-white">
                    <CardContent className="p-3 space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                          {exp.name[0]?.toUpperCase()}
                        </div>
                        <p className="font-semibold">{exp.name}</p>
                      </div>
                      <p>+ ₹{exp.amount}</p>
                      {exp.description && (
                        <p className="text-sm text-gray-200">
                          {exp.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Spent */}
          <div>
            <h3 className="text-xl font-semibold mb-2">💸 Who Spent</h3>
            <div className="space-y-4">
              {expenses
                .filter((e) => e.type === "spent")
                .map((exp, idx) => (
                  <Card key={idx} className="bg-red-800 text-white">
                    <CardContent className="p-3 space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                          {exp.name[0]?.toUpperCase()}
                        </div>
                        <p className="font-semibold">{exp.name}</p>
                      </div>
                      <p>- ₹{exp.amount}</p>
                      {exp.description && (
                        <p className="text-sm text-gray-200">
                          {exp.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
