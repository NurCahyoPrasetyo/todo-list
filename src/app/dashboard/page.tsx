"use client";

import { useCallback, useEffect, useState } from "react";

import NotesForm from "@/components/notes/NotesForm";
import NotesList from "@/components/notes/NotesList";
import { useAuth } from "@/context/AuthContext";
import {
  fetchArchivedNote,
  fetchDeleteNote,
  fetchGetNote,
  fetchGetNoteArchived,
  fetchUnArchivedNote,
} from "@/services/api/noteService";
import { Note } from "@/types/api";

const DashboardPage = () => {
  const { user, logout, token } = useAuth();
  const [isCreateNote, setIsCreateNote] = useState(false);
  const [listNotes, setListNotes] = useState<Note[]>([]);
  const [listNotesArchived, setListNotesArchived] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccessCreateNote = async () => {
    setIsCreateNote(false);
    await handleGetNote();
  };

  const handleArchivedNote = async (id: string, Archived: boolean) => {
    if (!token) return;

    try {
      const fetch = Archived
        ? fetchUnArchivedNote(id, token)
        : fetchArchivedNote(id, token);

      await fetch;
      await handleGetNote();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleRemovedNote = async (id: string) => {
    if (!token) return;

    try {
      await fetchDeleteNote(id, token);
      await handleGetNote();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const handleGetNote = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const res = await fetchGetNote(token);
      const resArchived = await fetchGetNoteArchived(token);

      setListNotes(Array.isArray(res) ? res : [res]);
      setListNotesArchived(
        Array.isArray(resArchived) ? resArchived : [resArchived]
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error creating note:", err);
    }
  }, [token]);

  useEffect(() => {
    if (token && token !== null) {
      handleGetNote();
    }
  }, [token, handleGetNote]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">
        Selamat datang, <strong>{user?.name}</strong> 👋
      </p>
      <p className="text-sm text-gray-500">Email: {user?.email}</p>

      <div className="flex gap-2 items-center mt-8">
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>

        <button
          onClick={() => setIsCreateNote(!isCreateNote)}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Note
        </button>
      </div>
      {isCreateNote && <NotesForm onSuccess={handleSuccessCreateNote} />}
      {!isLoading && (
        <div className="flex justify-around items-start mt-8">
          <NotesList
            lists={listNotes}
            onAction={(id, isArchived) => handleArchivedNote(id, isArchived)}
            onRemove={(id) => handleRemovedNote(id)}
          />
          <NotesList
            lists={listNotesArchived}
            onAction={(id, isArchived) => handleArchivedNote(id, isArchived)}
            onRemove={(id) => handleRemovedNote(id)}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
