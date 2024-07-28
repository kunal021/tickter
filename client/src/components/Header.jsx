import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUser } from "@/contex";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarCheck, Cookie, LogOut, Sun } from "lucide-react";
import axios from "axios";

function Header() {
  const { user, session } = useUser();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post("http://localhost:3050/logout", {
        sessionToken: session?.sessionToken,
      });
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("session");
      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center p-3">
        <Link
          to="/"
          className="text-3xl font-black bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent"
        >
          Tickter
        </Link>
        <div className="flex gap-4">
          {!user ? (
            <Link to={"/auth"}>
              <Button variant="secondary" className="border">
                Register
              </Button>
            </Link>
          ) : (
            <DropdownMenu className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback className="font-semibold text-black">
                    {user?.user_metadata?.name[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-1">
                <DropdownMenuLabel className="font-semibold text-center">
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  <Link to="/events">All Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Cookie className="mr-2 h-4 w-4" />
                  <Link to="/sessions">All Sessions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sun className="mr-2 h-4 w-4" />
                  <Link to="/weather">Weather</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
