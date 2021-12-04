import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from '../models/dto/update-note.dto';
import { CreateNoteDto } from '../models/dto/create-note.dto';

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto) {
    return 'This action adds a new note';
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
