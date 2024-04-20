import { useEffect, useState } from "react";
import useAuthRedirect from "../../lib/authRedirect";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import IssueCard from "../../components/Issue/IssueCard";
import { z } from "zod";
import AddIssueCard from "../../components/Issue/AddIssueCard";

export type Issue = {
  id: string;
  images: string[];
  user: {
    displayName: string;
    lastName: string;
    firstName: string;
  };
  resolver?: {
    displayName: string;
    lastName: string;
    firstName: string;
  };
  description: string;
  reportAt: Date;
  resolveAt?: Date;
  resolveMessage?: string;
  status: string;
  title: string;
  type: string;
};

export default function SupportDashboard() {
  const { currentUser, isLoading } = useUser();
  const [issues, setIssues] = useState<Issue[]>([]);
  useAuthRedirect();
  useEffect(() => {
    window.document.title = "Support | HorHub"
    const initData = async () => {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/issues",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (result.ok) {
        const data = await result.json();

        setIssues(data);
        console.log(data);
      }
    };
    initData();
  }, []);
  if (isLoading) return <LoadingPage />;
  if (!currentUser) return <NotFoundPage />;
  return (
    <div className="page">
      <div className="flex flex-col gap-y-4 w-full">
        {issues.map((issue) => (
          <IssueCard {...issue} role={currentUser.role} key={issue.id} />
        ))}
        {currentUser.role !== "Admin" && <AddIssueCard />}
      </div>
    </div>
  );
}
