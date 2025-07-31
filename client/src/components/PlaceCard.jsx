

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({ id, name, image, description }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-80 p-0 overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
      <CardHeader className="p-0 ">
        <img
          src={image}
          alt={name}
          className="w-full h-61 object-cover rounded-t-xl"
        />
      </CardHeader>

      <CardContent className="p-1 flex flex-col items-center justify-center text-center mb-1 space-y-2 h-[100px]">
  <CardTitle className="text-xl font-semibold">{name}</CardTitle>
  <p className="text-sm text-black">{description}</p>
  <Button
    variant="secondary"
    className="text-xs text-white px-3 py-1 bg-black hover:bg-red-600"
    onClick={() => navigate(`/destination/${id}`)}
  >
    View More
  </Button>
</CardContent>

    </Card>
  );
};

export default PlaceCard;
