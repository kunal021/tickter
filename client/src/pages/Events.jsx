import AddEvent from "@/components/AddEvent";
import GetEvent from "@/components/GetEvent";
import { useState } from "react";

function Events() {
  const [data, setData] = useState([]);
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="flex justify-between items-center gap-4 w-full my-5 lg:px-32">
        <p className="text-3xl font-black">My Events</p>
        <AddEvent setAddData={setData} addData={data} />
      </div>
      <GetEvent data={data} setData={setData} />
    </div>
  );
}

export default Events;
