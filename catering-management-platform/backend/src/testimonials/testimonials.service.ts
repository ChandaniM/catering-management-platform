import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: createTestimonialDto,
    });
  }

  async findAll() {
    return this.prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActive() {
    return this.prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.testimonial.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    return this.prisma.testimonial.update({
      where: { id },
      data: updateTestimonialDto,
    });
  }

  async remove(id: number) {
    return this.prisma.testimonial.delete({
      where: { id },
    });
  }
}
