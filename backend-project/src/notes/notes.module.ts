import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesProviders } from './notes.providers';

@Module({
  controllers: [NotesController],
  providers: [...NotesProviders, NotesService]
})
export class NotesModule {}
