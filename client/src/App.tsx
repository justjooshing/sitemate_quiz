import { Suspense } from "react";
import "./App.css";
import {
  Issue,
  useCreateIssue,
  useDeleteIssue,
  useGetIssue,
  useUpdateIssue,
} from "./api/query";

function App() {
  const {
    data: { data: currentIssue },
  } = useGetIssue();
  const deleteIssue = useDeleteIssue();
  const updateIssue = useUpdateIssue();
  const createIssue = useCreateIssue();

  const handleDelete = () => {
    deleteIssue.mutate(currentIssue);
  };

  const handleUpdate = () => {
    const issue: Issue = { ...currentIssue, title: "This is my updated title" };
    updateIssue.mutate(issue);
  };

  const handleCreate = () => {
    const newIssue: Issue = {
      id: `${Math.ceil(Math.random() * 100)}`,
      title: "This is the new issue title",
      description: "This is the updated description",
    };
    createIssue.mutate(newIssue);
  };
  return (
    <Suspense fallback="loading">
      {Object.values(currentIssue).map((prop) => (
        <p key={prop}>{prop}</p>
      ))}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={handleDelete}>Delete Current Issue</button>
        {deleteIssue.isError && <p>{deleteIssue.error.message}</p>}
        <button onClick={handleUpdate}>Update</button>
        {updateIssue.isError && <p>{updateIssue.error.message}</p>}

        <button onClick={handleCreate}>Create</button>
        {createIssue.isError && <p>{createIssue.error.message}</p>}
      </div>
    </Suspense>
  );
}

export default App;
