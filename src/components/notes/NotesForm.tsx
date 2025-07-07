import React, { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { fetchCreateCheckList } from "@/services/api/noteService";

type NotesFormProps = {
  onSuccess: () => void;
};

const NotesForm: React.FC<NotesFormProps> = ({ onSuccess }) => {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoding, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await fetchCreateCheckList(title, token);
      await onSuccess();
      setIsLoading(false);
      setTitle("");
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Create failed");
      }
    }
  };

  return (
    <form className="px-5 py-7" onSubmit={handleCreateNote}>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        title
      </label>
      <input
        type="text"
        required
        className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        disabled={isLoding}
      >
        {isLoding ? (
          "Loading..."
        ) : (
          <>
            <span className="inline-block mr-2">Create</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};
export default NotesForm;
