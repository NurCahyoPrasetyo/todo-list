import { ApiResponse, Note } from "@/types/api";
import { apiClient } from "./apiClient";

export async function fetchCreateCheckList(
  name: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>("/checklist", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  return res.data;
}

export async function fetchGetCheckList(token?: string | null): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>("/checklist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchDeleteCheckList(
  id: number,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(`/checklist/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function fetchCreateCheckItem(
  id: number,
  itemName: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(`/checklist/${id}/item`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ itemName }),
  });

  return res.data;
}

export async function fetchCheckedItem(
  id: number,
  idItem: number,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(
    `/checklist/${id}/item/${idItem}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function fetchRenameItem(
  id: number,
  idItem: number,
  itemName: string,
  token?: string | null
): Promise<Note> {
  const res = await apiClient<ApiResponse<Note>>(
    `/checklist/${id}/item/${idItem}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemName }),
    }
  );

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
