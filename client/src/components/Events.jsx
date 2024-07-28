import { useUser } from "@/contex";

function Events() {
  const { user, loading, error, isAuthenticated } = useUser();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      {isAuthenticated ? <p>Auth</p> : <p>Not auth</p>}
    </div>
  );
}

export default Events;
