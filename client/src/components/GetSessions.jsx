/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useUser } from "@/contex";
import Paging from "./Paging";

function GetSessions() {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationData, setPaginationData] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3050/sessions?page=${pageNumber}&limit=10`
        );
        if (response.status === 200) {
          setData(response.data.sessions);
          setPaginationData(response.data.pagination);
        }
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [pageNumber, user?.id]);

  if (error && !loading) {
    return (
      <div className="text-black text-3xl font-bold text-center">{error}</div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-3xl font-black text-center">Users Sessions</p>
      {Array.isArray(data) &&
        data.map(
          (session) =>
            session &&
            session._id && (
              <Card
                key={session._id}
                className="w-full flex flex-col break-all gap-4"
              >
                <CardHeader>
                  <CardTitle>UserId: {session?.userId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap justify-between items-center gap-6">
                    <p>IP: {session?.ipAddress}</p>
                    <p>SessionToken: {session?.sessionToken}</p>
                    <p>LoginTime: {session?.loginTime}</p>
                  </div>
                </CardContent>
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

export default GetSessions;
