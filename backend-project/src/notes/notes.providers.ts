import { Note } from "../models/entities/note.entity";

export const NotesProviders = [
  {
    provide: 'NOTES_REPOSITORY',
    useValue: Note,
  },
];