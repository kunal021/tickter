/* eslint-disable react/prop-types */
import { useUser } from "@/contex";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

function AddEvent({ setAddData }) {
  const { user } = useUser();
  const [data, setData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const addEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://tickter.onrender.com/event", {
        userId: user.id,
        ...data,
      });
      if (response.status === 200) {
        setAddData((prevData) => [...prevData, response.data.event]);
        toast.success("Event created successfully");
        setData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Add Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              value={data.title}
              name="title"
              type="text"
              onChange={handleChange}
              placeHolder="Title"
            />
            <Input
              value={data.description}
              name="description"
              type="text"
              onChange={handleChange}
              placeHolder="Description"
            />
            <Input
              value={data.date}
              name="date"
              type="date"
              onChange={handleChange}
            />
            <Input
              value={data.time}
              name="time"
              type="time"
              onChange={handleChange}
            />
            <Input
              value={data.location}
              name="location"
              type="text"
              onChange={handleChange}
              placeHolder="Location"
            />
            <Button onClick={addEvent}>
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "Add Event"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEvent;
