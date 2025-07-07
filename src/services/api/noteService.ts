import { ApiResponse, Note } from "@/types/api";
import { apiClient } from "./apiClient";

export async function fetchCreateNote(
  title: string,
  body: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>("/notes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, body }),
  });

  return res.data;
}

export async function fetchGetNote(token?: string | null): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchGetNoteArchived(
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>("/notes/archived", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchArchivedNote(
  id: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(`/notes/${id}/archive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchUnArchivedNote(
  id: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(`/notes/${id}/unarchive`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchDeleteNote(
  id: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(`/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
