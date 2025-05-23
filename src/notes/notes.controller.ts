import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesServices: NotesService) {}

  @Get()
  findAll() {
    return this.notesServices.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesServices.findOne(+id);
  }

  @Post()
  createOne(@Body() notes: { title: string; content: string }) {
    return this.notesServices.createOne(notes);
  }

  @Patch()
  updateOne(@Body() notes: { id: number; title: string; content: string }) {
    return this.notesServices.updateOne(notes);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.notesServices.deleteOne(+id);
  }
}
