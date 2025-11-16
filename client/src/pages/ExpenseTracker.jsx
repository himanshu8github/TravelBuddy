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
  const [description, setDescription] = useState("");
  const [type, setType] = useState("added");
  const [user, setUser] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [originalExpense, setOriginalExpense] = useState(null);

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
        const updated = {
          name,
          amount: parseFloat(amount),
          trip,
          type,
        };

        const newDesc = generateDescription(originalExpense, updated);

        const expenseRef = doc(db, "expenses", editingExpenseId);
        await updateDoc(expenseRef, {
          ...updated,
          description: newDesc,
          updatedAt: serverTimestamp(),
        });
        setEditingExpenseId(null);
        setOriginalExpense(null);
      } else {
        await addDoc(collection(db, "expenses"), {
          uid: user.uid,
          name,
          amount: parseFloat(amount),
          description,
          type,
          trip,
          createdAt: serverTimestamp(),
        });
      }

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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white pb-24">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 px-6 py-4 bg-black/50 backdrop-blur border-b"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-sm"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            {user && (
              <Button
                className="text-sm text-white"
                style={{ backgroundColor: "#7a1d2f" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 px-6 max-w-6xl mx-auto space-y-6" ref={formRef}>
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
            Travel Expense Tracker
          </h2>
          <div
            className="mx-auto mt-3 h-[3px] w-40 rounded-full animate-pulse"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
          />
        </div>

        {/* Form */}
        <Card
          className="bg-[#111217]/85 backdrop-blur border rounded-2xl"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <div
            className="pointer-events-none w-full h-0.5"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
          />
          <CardContent className="p-5 md:p-6 grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-[#ffdfe5]">Name</Label>
              <Input
                placeholder="Who?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 bg-[#111217] border text-sm placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none"
                style={{ borderColor: "rgba(255,175,189,0.28)", color: "#fef6f8" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.28)")}
              />
            </div>
            <div>
              <Label className="text-xs text-[#ffdfe5]">Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 bg-[#111217] border text-sm placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none"
                style={{ borderColor: "rgba(255,175,189,0.28)", color: "#fef6f8" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.28)")}
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs text-[#ffdfe5]">Description</Label>
              <Input
                placeholder="Lunch, hotel booking, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={!!editingExpenseId}
                className="mt-1 bg-[#111217] border text-sm placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none disabled:opacity-70"
                style={{ borderColor: "rgba(255,175,189,0.28)", color: "#fef6f8" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.28)")}
              />
              {editingExpenseId && (
                <p className="text-[11px] text-gray-400 mt-1">
                  Description is auto-generated during updates.
                </p>
              )}
            </div>
            <div>
              <Label className="text-xs text-[#ffdfe5]">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger
                  className="mt-1 bg-[#111217] border text-sm focus-visible:ring-0"
                  style={{ borderColor: "rgba(255,175,189,0.28)", color: "#fef6f8" }}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f1014] text-white border border-[#ff8fab33]">
                  <SelectItem value="added">Added</SelectItem>
                  <SelectItem value="spent">Spent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-[#ffdfe5]">Trip</Label>
              <Input
                placeholder="Enter trip name (e.g., Goa, Manali)"
                value={trip}
                onChange={(e) => setTrip(e.target.value)}
                className="mt-1 bg-[#111217] border text-sm placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none"
                style={{ borderColor: "rgba(255,175,189,0.28)", color: "#fef6f8" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.28)")}
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button
                className="w-full text-sm text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
                onClick={handleSaveExpense}
              >
                {editingExpenseId ? "Update Expense" : "Add Expense"}
              </Button>
              {editingExpenseId && (
                <Button
                  variant="outline"
                  className="w-full text-sm border"
                  style={{ borderColor: "rgba(255,175,189,0.35)", color: "#ffdfe5" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
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
              <Card
                key={tripName}
                className="w-full md:w-[32%] bg-[#111217]/85 backdrop-blur border rounded-2xl"
                style={{ borderColor: "rgba(255,175,189,0.22)" }}
              >
                <div
                  className="pointer-events-none w-full h-0.5"
                  style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
                />
                <CardContent className="p-4 md:p-5 space-y-4">
                  <h3 className="text-lg font-bold text-center text-[#ffdfe5]">
                    {tripName} Trip
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border p-3 bg-[#132015]/40"
                         style={{ borderColor: "rgba(74,222,128,0.25)" }}>
                      <h4 className="text-xs text-green-300 font-semibold">Total Added</h4>
                      <p className="text-base font-bold text-green-400">₹{totalAdded.toFixed(2)}</p>
                    </div>
                    <div className="rounded-lg border p-3 bg-[#2a1214]/40"
                         style={{ borderColor: "rgba(248,113,113,0.25)" }}>
                      <h4 className="text-xs text-rose-300 font-semibold">Total Spent</h4>
                      <p className="text-base font-bold text-rose-400">₹{totalSpent.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Added */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400">💰 Added</h4>
                    {tripExpenses
                      .filter((e) => e.type === "added")
                      .map((exp) => (
                        <Card key={exp.id} className="bg-[#0e1a12] border text-white">
                          <div
                            className="pointer-events-none w-full h-0.5"
                            style={{ background: "linear-gradient(90deg,#b9fbc0,#34d399)" }}
                          />
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
                            <p className="text-green-300">+ ₹{exp.amount}</p>
                            {exp.description && (
                              <p className="text-xs md:text-sm text-gray-300">{exp.description}</p>
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
                        <Card key={exp.id} className="bg-[#1a0f12] border text-white">
                          <div
                            className="pointer-events-none w-full h-0.5"
                            style={{ background: "linear-gradient(90deg,#fecdd3,#f43f5e)" }}
                          />
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
                            <p className="text-rose-300">- ₹{exp.amount}</p>
                            {exp.description && (
                              <p className="text-xs md:text-sm text-gray-300">{exp.description}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Decorative backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background: "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)",
        }}
      />

      <style>{`
        .animate-pulse {
          animation: pulse-soft 2.6s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%,100% { opacity:.35; transform:scaleX(.96); }
          50% { opacity:.75; transform:scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default ExpenseTracker;