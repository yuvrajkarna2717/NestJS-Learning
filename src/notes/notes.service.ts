import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async findAll() {
    const notes = await this.noteRepository.find();
    return {
      message: 'Fetched all notes successfully.',
      notes,
    };
  }

  async findOne(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException(`Note with ID ${id} not found`);
    return note;
  }

  async createOne(data: { title: string; content: string }) {
    const newNote = this.noteRepository.create(data);
    const saved = await this.noteRepository.save(newNote);
    return {
      message: `Note with ID ${saved.id} created successfully.`,
      ...saved,
    };
  }

  async updateOne(data: {id: number,  title: string; content: string }) {
    const id = data.id;
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note)
      throw new NotFoundException(
        `Note with ID ${id} not found. Please provide a valid note ID.`,
      );

    await this.noteRepository.update(id, data);
    const updated = await this.noteRepository.findOne({ where: { id } });
    return {
      message: `Note with ID ${id} updated successfully.`,
      ...updated,
    };
  }

  async deleteOne(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note)
      throw new NotFoundException(
        `Note with ID ${id} not found. Please provide a valid ID.`,
      );

    await this.noteRepository.delete(id);
    return {
      message: `Note with ID ${id} deleted successfully.`,
      deleted: note,
    };
  }
}
