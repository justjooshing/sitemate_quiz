import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { client } from "./axios";
import { ENDPOINTS } from "./endpoints";

enum Keys {
  issues = "issues",
}

interface Issue {
  id: string;
  title: string;
  description: string;
}

const getIssue = async (issue: Issue) => {
  const params = new URLSearchParams();
  params.append("issueid", issue.id);
  client.get<Issue>(ENDPOINTS.ISSUES, { params });
};

export const useGetIssue = (issue: Issue) =>
  useSuspenseQuery({
    queryKey: [Keys.issues],
    queryFn: () => getIssue(issue),
  });

const createIssue = async (newIssue: Issue) =>
  await client.post(ENDPOINTS.CREATE_ISSUE, newIssue);

export const useCreateIssue = () => {
  const queryClient = useQueryClient();
  const keys = [Keys.issues];
  return useMutation({
    mutationFn: createIssue,
    mutationKey: keys,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys });
    },
  });
};

const updateIssue = async (updatedIssue: Issue) =>
  await client.post(ENDPOINTS.UPDATE_ISSUE, updatedIssue);

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();
  const keys = [Keys.issues];
  return useMutation({
    mutationFn: updateIssue,
    mutationKey: keys,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys });
    },
  });
};

const deleteIssue = async (issue: Issue) => {
  const params = new URLSearchParams();
  params.append("issueid", issue.id);
  await client.delete(ENDPOINTS.DELETE_ISSUE, { params });
};

export const useDeleteIssue = () => {
  const queryClient = useQueryClient();
  const keys = [Keys.issues];
  return useMutation({
    mutationFn: deleteIssue,
    mutationKey: keys,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: keys });
    },
  });
};
