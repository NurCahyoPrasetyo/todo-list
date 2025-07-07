import { Note } from "@/types/api";
import React, { useState } from "react";

type NotesListProps = {
  lists: Array<Note>;
  onAction: (noteId: string, Archived: boolean) => void;
  onRemove: (noteId: number) => void;
  onCreateItem?: (noteId: number, name: string) => void;
  onCheckItem: (noteId: number, itemId: number) => void;
  onRenameItem: (noteId: number, itemId: number, name: string) => void;
};
const NotesList: React.FC<NotesListProps> = ({
  lists,
  onAction,
  onRemove,
  onCreateItem,
  onCheckItem,
  onRenameItem,
}) => {
  const [isCreateNote, setIsCreateNote] = useState<number | null>(null);
  const [isEditname, setEditname] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [nameItem, setNameItem] = useState("");

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
            <button
              className="cursor-pointer mt-6 px-4 py-2 bg-green-500 text-white rounded"
              onClick={() =>
                setIsCreateNote(note.id === isCreateNote ? null : note.id)
              }
            >
              create item
            </button>
            Note: click name item for edit text
            {isCreateNote === note.id && (
              <div className="flex gap-2 mt-2 p-2">
                <input
                  type="text"
                  value={nameItem}
                  onChange={(e) => setNameItem(e.target.value)}
                  placeholder="Enter item name"
                  className="border p-2 rounded w-full"
                />
                <button
                  className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {
                    if (onCreateItem) {
                      onCreateItem(note.id, nameItem);
                      setNameItem("");
                      setIsCreateNote(null);
                    }
                  }}
                >
                  Add Item
                </button>
              </div>
            )}
            <div className="p-2">
              <div className="col-span-5 md:col-span-4 ml-4">
                {note.items && note.items.length > 0 ? (
                  <ul className="pl-5">
                    {note.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-gray-600 font-bold flex justify-between"
                      >
                        <input
                          type="checkbox"
                          name="hobbies"
                          value="traveling"
                          className="mr-2"
                          checked={item.itemCompletionStatus}
                          onChange={() => onCheckItem(note.id, item.id)}
                        />
                        {isEditname !== `${note.id} - ${item.id}` ? (
                          <p
                            onClick={() =>
                              setEditname(
                                `${note.id} - ${item.id}` === isEditname
                                  ? null
                                  : `${note.id} - ${item.id}`
                              )
                            }
                          >
                            {item.name === null ? "not set" : item.name}
                          </p>
                        ) : (
                          <div>
                            <input
                              type="text"
                              placeholder={item.name}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <button
                              className="bg-green-500 p-2 ml-1"
                              onClick={() =>
                                onRenameItem(note.id, item.id, name)
                              }
                            >
                              edit
                            </button>
                          </div>
                        )}

                        <button className="bg-red-200 p-1 mb-1">delete</button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
