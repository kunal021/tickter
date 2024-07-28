/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useUser } from "@/contex";
import toast from "react-hot-toast";
import { DeleteAlert } from "./DeleteAlert";
import UpdateEVent from "./UpdateEvent";
import { Button } from "./ui/button";
import Paging from "./Paging";
import { Input } from "./ui/input";

function GetEvent({ data, setData }) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3050/events/${user?.id}?search=${search}&page=${pageNumber}&limit=10`
        );
        if (response.status === 200) {
          setData(response.data.events);
          setPaginationData(response.data.pagination);
        }
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [pageNumber, search, user?.id]);

  const deleteEvent = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:3050/event/${id}`);
      if (response.status === 200) {
        setData((prevData) => prevData.filter((event) => event._id !== id));
        toast.success("Event deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (error && !loading) {
    return (
      <div className="text-black text-3xl font-bold text-center">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full lg:w-[80%]">
      <div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, description or location"
        />
      </div>
      {Array.isArray(data) &&
        data.map(
          (event) =>
            event &&
            event._id && (
              <Card key={event._id} className="w-full flex gap-4">
                <div className="w-[90%]">
                  <CardHeader>
                    <CardTitle>{event?.title}</CardTitle>
                    <CardDescription>{event?.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap justify-between items-center gap-6">
                      <p>{event?.date}</p>
                      <p>{event?.time}</p>
                      <Button variant="outline">{event?.location}</Button>
                    </div>
                  </CardContent>
                </div>
                <div className="w-[15%] md:w-[10%] flex flex-col justify-between items-center my-5 px-2">
                  <DeleteAlert
                    deleteEvent={deleteEvent}
                    loading={loading}
                    id={event._id}
                  />
                  <UpdateEVent updateData={event} setUpdateData={setData} />
                </div>
              </Card>
            )
        )}
      <div>
        <Paging
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pagination={paginationData}
        />
      </div>
    </div>
  );
}

export default GetEvent;
