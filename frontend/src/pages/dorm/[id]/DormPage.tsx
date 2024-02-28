import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../etc/LoadingPage";

export default function DormPage() {
  const { id } = useParams();
  const [dormData, setDormData] = useState<Object | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.REACT_APP_BACKEND_URL + "/dorms/" + id);
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/dorms/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 404) {
        // TODO : use 🍞 toast to notify
        return navigate("/");
      }
      const data = await result.json();
      setDormData(data);
    };
    fetchData();
  }, []);
  if (!dormData) return <LoadingPage />;
  return (
    <div>
      <div>data : {JSON.stringify(dormData)}</div>
    </div>
  );
}
