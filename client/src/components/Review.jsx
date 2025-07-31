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
    <div className="bg-black pt-24 scroll-mt-20 text-white py-12">
      <h1 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <Card key={index} className="bg-white text-black flex flex-col justify-between shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-center">{review.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center space-y-4">
              <p className="text-sm italic">"{review.review}"</p>
              <div className="flex justify-center">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <span key={i} className="text-gray-300 text-lg">★</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Review;