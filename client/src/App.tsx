import { Suspense } from "react";
import "./App.css";
import {
  Issue,
  useCreateIssue,
  useDeleteIssue,
  useGetIssue,
  useUpdateIssue,
} from "./api/query";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<Issue>();
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

  const handleCreate = ({ title, description }: Issue) => {
    const newIssue: Issue = {
      id: `${Math.ceil(Math.random() * 100)}`,
      title,
      description,
    };
    createIssue.mutate(newIssue);
  };

  return (
    <Suspense fallback="loading">
      {Object.values(currentIssue).map((prop) => (
        <p key={prop}>{prop}</p>
      ))}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={handleDelete}>Delete Current Issue</button>
        {deleteIssue.isError && <p>{deleteIssue.error.message}</p>}
        <button onClick={handleUpdate}>Update Current Issue</button>
        {updateIssue.isError && <p>{updateIssue.error.message}</p>}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            gap: "10px",
          }}
          onSubmit={handleSubmit(handleCreate)}
        >
          <div>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
            />
            {formErrors.title && <p>Title is required</p>}
          </div>
          <div>
            <input
              placeholder="Description"
              {...register("description", { required: true })}
            />
            {formErrors.description && <p>Description is required</p>}
          </div>

          <button type="submit">Create New Issue</button>
        </form>
        {createIssue.isError && <p>{createIssue.error.message}</p>}
      </div>
    </Suspense>
  );
}

export default App;
