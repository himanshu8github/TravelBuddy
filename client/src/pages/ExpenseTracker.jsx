import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

const ExpenseTracker = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [trip, setTrip] = useState("");
  const [description, setDescription] = useState(""); // For display only, no editing
  const [type, setType] = useState("added");
  const [user, setUser] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [originalExpense, setOriginalExpense] = useState(null); // To track original data before edit

  const formRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      return;
    }
    const q = query(
      collection(db, "expenses"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(list);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpenseId(expense.id);
    setName(expense.name);
    setAmount(expense.amount.toString());
    setDescription(expense.description || "");
    setType(expense.type);
    setTrip(expense.trip || "");
    setOriginalExpense(expense);
    scrollToForm();
  };

  const generateDescription = (original, updated) => {
    let changes = [];

    if (original.name !== updated.name) {
      changes.push(`name changed from "${original.name}" to "${updated.name}"`);
    }
    if (original.amount !== updated.amount) {
      changes.push(`amount changed from ₹${original.amount} to ₹${updated.amount}`);
    }
    if (original.trip !== updated.trip) {
      changes.push(
        `trip changed from "${original.trip || "Miscellaneous"}" to "${updated.trip || "Miscellaneous"}"`
      );
    }
    if (original.type !== updated.type) {
      changes.push(`type changed from "${original.type}" to "${updated.type}"`);
    }

    if (changes.length === 0) {
      return original.description || "";
    }
    return changes.join("; ") + ".";
  };

  const handleSaveExpense = async () => {
    if (!name || !amount || !type) return;
    if (!user) {
      alert("Please login to add or update an expense.");
      return;
    }

    try {
      if (editingExpenseId && originalExpense) {
        // Prepare updated values
        const updated = {
          name,
          amount: parseFloat(amount),
          trip,
          type,
        };

        // Generate new description automatically
        const newDesc = generateDescription(originalExpense, updated);

        // Update existing expense with generated description
        const expenseRef = doc(db, "expenses", editingExpenseId);
        await updateDoc(expenseRef, {
          ...updated,
          description: newDesc,
          updatedAt: serverTimestamp(),
        });
        setEditingExpenseId(null);
        setOriginalExpense(null);
      } else {
        // Add new expense (user can set description manually)
        await addDoc(collection(db, "expenses"), {
          uid: user.uid,
          name,
          amount: parseFloat(amount),
          description, // user entered description
          type,
          trip,
          createdAt: serverTimestamp(),
        });
      }

      // Clear form fields after save
      setName("");
      setAmount("");
      setDescription("");
      setType("added");
      setTrip("");
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setOriginalExpense(null);
    setName("");
    setAmount("");
    setDescription("");
    setType("added");
    setTrip("");
  };

  const groupedByTrip = expenses.reduce((acc, curr) => {
    const tripName = curr.trip || "Miscellaneous";
    if (!acc[tripName]) acc[tripName] = [];
    acc[tripName].push(curr);
    return acc;
  }, {});

  return (
    <div className="bg-black text-white min-h-screen pb-20">
      {/* Navbar */}
      <nav className="w-full bg-black text-white shadow-md fixed top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => navigate("/home")}
          >
            TravelBuddy
          </h1>
          <div className="flex gap-4">
            <Button
              className="bg-white text-black hover:bg-purple-800"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            {user && (
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 px-6 max-w-5xl mx-auto space-y-6" ref={formRef}>
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
              {/* Show description but disable editing during update */}
              <Input
                placeholder="Lunch, hotel booking, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!!editingExpenseId} // disable editing when updating
              />
              {editingExpenseId && (
                <p className="text-xs text-gray-600 mt-1">
                  Description is auto-generated during updates.
                </p>
              )}
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
            <div>
              <Label>Trip</Label>
              <Input
                placeholder="Enter trip name (e.g., Goa, Manali)"
                value={trip}
                onChange={(e) => setTrip(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button
                className="bg-purple-700 text-white w-full"
                onClick={handleSaveExpense}
              >
                {editingExpenseId ? "Update Expense" : "Add Expense"}
              </Button>
              {editingExpenseId && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Display grouped by Trip */}
        <div className="flex flex-wrap gap-6">
          {Object.entries(groupedByTrip).map(([tripName, tripExpenses]) => {
            const totalAdded = tripExpenses
              .filter((e) => e.type === "added")
              .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
            const totalSpent = tripExpenses
              .filter((e) => e.type === "spent")
              .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

            return (
              <div
                key={tripName}
                className="flex flex-col bg-zinc-800 rounded-lg p-4 w-full md:w-[32%] shadow space-y-4"
              >
                <h3 className="text-xl font-bold text-purple-400 text-center">
                  {tripName} Trip
                </h3>

                <div className="flex justify-between bg-purple-900 text-white p-3 rounded shadow">
                  <div>
                    <h4 className="text-sm font-semibold">Total Added</h4>
                    <p>₹{totalAdded.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Total Spent</h4>
                    <p>₹{totalSpent.toFixed(2)}</p>
                  </div>
                </div>

                {/* Added */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400">💰 Added</h4>
                  {tripExpenses
                    .filter((e) => e.type === "added")
                    .map((exp) => (
                      <Card
                        key={exp.id}
                        className="bg-green-800 text-white w-full"
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                                {exp.name[0]?.toUpperCase()}
                              </div>
                              <p className="font-semibold">{exp.name}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-black"
                              onClick={() => handleEditClick(exp)}
                            >
                              Update
                            </Button>
                          </div>
                          <p>+ ₹{exp.amount}</p>
                          {exp.description && (
                            <p className="text-sm text-gray-200">{exp.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* Spent */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-400">💸 Who Spent</h4>
                  {tripExpenses
                    .filter((e) => e.type === "spent")
                    .map((exp) => (
                      <Card
                        key={exp.id}
                        className="bg-red-800 text-white w-full"
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold">
                                {exp.name[0]?.toUpperCase()}
                              </div>
                              <p className="font-semibold">{exp.name}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-black"
                              onClick={() => handleEditClick(exp)}
                            >
                              Update
                            </Button>
                          </div>
                          <p>- ₹{exp.amount}</p>
                          {exp.description && (
                            <p className="text-sm text-gray-200">{exp.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
