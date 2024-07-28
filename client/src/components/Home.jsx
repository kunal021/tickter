import { useUser } from "@/contex";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

function Home() {
  const { isAuthenticated } = useUser();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-xl sm:text-3xl md:text-5xl capitalize font-black text-center mx-2 sm:mx-6 md:mx-10 lg:mx-44 mt-14">
        Tickter your one stop for all your event management needs
      </div>
      <img
        src="/event1.jpeg"
        alt="home"
        className="rounded-lg h-60 md:h-96 w-80 md:w-[60%] object-cover my-10"
      />
      <div>
        {isAuthenticated ? (
          <Link to="/events">
            <Button
              variant="secondary"
              className="border flex justify-center items-center gap-2 text-lg"
            >
              All Events <MoveRight className="w-6 h-6 pt-1" />
            </Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button
              variant="secondary"
              className="border flex justify-center items-center gap-2 text-lg"
            >
              Register or Login <MoveRight className="w-6 h-6 pt-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
