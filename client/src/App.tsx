import { Suspense } from "react";
import "./App.css";
import {
  useCreateIssue,
  useDeleteIssue,
  useGetIssue,
  useUpdateIssue,
} from "./api/query";

function App() {
  const {
    data: { data },
    isLoading,
  } = useGetIssue();
  const { mutate: deleteIssue } = useDeleteIssue();
  const { mutate: updateIssue } = useUpdateIssue();
  const { mutate: createIssue } = useCreateIssue();
  console.log(data);

  return (
    <Suspense fallback="loading">
      {Object.values(data).map((prop) => {
        return <p key={prop}>{prop}</p>;
      })}
    </Suspense>
  );
}

export default App;
