import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async create(createGalleryDto: CreateGalleryDto) {
    return this.prisma.galleryImage.create({
      data: createGalleryDto,
    });
  }

  async findAll() {
    return this.prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.galleryImage.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return this.prisma.galleryImage.update({
      where: { id },
      data: updateGalleryDto,
    });
  }

  async remove(id: number) {
    return this.prisma.galleryImage.delete({
      where: { id },
    });
  }
}
