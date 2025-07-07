import { Note } from "@/types/api";
import React from "react";

type NotesListProps = {
  lists: Array<Note>;
  onAction: (noteId: string, Archived: boolean) => void;
  onRemove: (noteId: number) => void;
};
const NotesList: React.FC<NotesListProps> = ({ lists, onAction, onRemove }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-8 w-full">
      {lists.map((note, index) => (
        <div
          key={index}
          className="flex flex-wrap gap-4 items-center justify-center bg-white"
        >
          <div className="w-[30rem] border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
            <div className="flex justify-between">
              <p
                className={`bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl`}
              >
                {note.name}
              </p>

              <button
                className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => onRemove(note.id)}
              >
                Remove
              </button>
            </div>

            <div className="p-2">
              <div className="col-span-5 md:col-span-4 ml-4">
                {/* <p className="text-sky-500 font-bold text-xs">{note.title}</p>

                <p className="text-gray-600 font-bold">{note.body}</p>


                <p className="text-gray-400">{note.owner}</p> */}

                {/* <div className="flex gap-2 mt-2">
                  <button
                    className="cursor-pointer mt-6 px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => onAction(note.id, note.archived)}
                  >
                    {note.archived ? "Un Archived" : "Archived"}
                  </button>
                  <button
                    className="cursor-pointer mt-6 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => onRemove(note.id)}
                  >
                    Remove
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
