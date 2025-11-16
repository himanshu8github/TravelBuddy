import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Vasu",
    review: "Amazing trip experience! TravelBuddy handled everything smoothly.",
    rating: 5,
  },
  {
    name: "Ashwin",
    review: "Super helpful app, and very intuitive design. Would recommend! ",
    rating: 4,
  },
  {
    name: "Neeraj",
    review: "Loved how I could customize everything, even with friends. ⭐⭐⭐⭐⭐",
    rating: 5,
  },
];

const Review = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 scroll-mt-20 text-white bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
        What Our Customers Say
      </h1>
      <div
        className="mx-auto mb-10 h-[3px] w-40 rounded-full animate-pulse"
        style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <Card
            key={index}
            className="bg-[#111217]/85 text-white flex flex-col justify-between border rounded-2xl backdrop-blur shadow-xl hover:-translate-y-1 transition-all"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none w-full h-0.5 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            <CardHeader>
              <CardTitle className="text-xl text-center text-[#ffdfe5]">
                {review.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center space-y-4 pb-6">
              <p className="text-sm italic text-gray-300">"{review.review}"</p>
              <div className="flex justify-center">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <span key={i} className="text-gray-600 text-lg">★</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style>{`
        .animate-pulse { animation: pulse-soft 2.6s ease-in-out infinite; }
        @keyframes pulse-soft { 0%,100% { opacity:.35; transform:scaleX(.96); } 50% { opacity:.75; transform:scaleX(1); } }
      `}</style>
    </div>
  );
};

export default Review;