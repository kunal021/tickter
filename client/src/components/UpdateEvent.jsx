/* eslint-disable react/prop-types */
// import { useUser } from "@/contex";
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
import { Loader, PenBox } from "lucide-react";

function UpdateEVent({ setUpdateData, updateData }) {
  //   const { user } = useUser();
  const [data, setData] = useState({
    title: updateData.title,
    description: updateData.description,
    date: updateData.date,
    time: updateData.time,
    location: updateData.location,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const updateEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `https://tickter.onrender.com/event/${updateData._id}`,
        {
          eventId: updateData._id,
          newEvent: { data },
        }
      );
      //   console.log(response);
      if (response.status === 200) {
        setUpdateData((prevData) =>
          prevData.map((event) =>
            event._id === updateData._id ? { ...event, ...data } : event
          )
        );
        toast.success("Event updated successfully");
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
          <PenBox className="w-8 h-8 text-blue-500 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Update Event
            </DialogTitle>
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
            <Button onClick={updateEvent}>
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "Update Event"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateEVent;
