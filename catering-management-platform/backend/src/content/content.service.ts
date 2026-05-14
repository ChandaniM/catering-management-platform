import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    return this.prisma.content.create({
      data: createContentDto,
    });
  }

  async findAll() {
    return this.prisma.content.findMany({
      orderBy: [{ pageName: 'asc' }, { order: 'asc' }],
    });
  }

  async findByPage(pageName: string) {
    return this.prisma.content.findMany({
      where: { pageName, active: true },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.content.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data: updateContentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.content.delete({
      where: { id },
    });
  }
}
