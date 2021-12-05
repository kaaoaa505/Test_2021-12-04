import { Inject, Injectable } from '@nestjs/common';
import { UpdateNoteDto } from '../models/dto/update-note.dto';
import { CreateNoteDto } from '../models/dto/create-note.dto';
import { Note } from '../models/entities/note.entity';

@Injectable()
export class NotesService {
  
  constructor(
    @Inject('NOTES_REPOSITORY')
    private notesRepository: typeof Note
  ) { }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.create(createNoteDto);
  }

  async findAll(): Promise<Note[]> {
    return this.notesRepository.findAll<Note>();
  }

  async findOne(id: number): Promise<Note> {
    return this.notesRepository.findByPk(id);
  }

  async update(id: number, updateTodoDto: UpdateNoteDto): Promise<Note> {
    try {
      let values = {
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        categoryId: updateTodoDto.categoryId,
        userId: updateTodoDto.userId
      }
      await this.notesRepository.update(values, {
        where: {
          id: id
        }
      });
      return this.notesRepository.findByPk(id);
    } catch (error) {
      return error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      await this.notesRepository.destroy({
        where: {
          id: id
        }
      });
      return id;
    } catch (error) {
      return error;
    }
  }
}
