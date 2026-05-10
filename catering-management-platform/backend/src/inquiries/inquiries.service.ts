import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(createInquiryDto: CreateInquiryDto) {
    return this.prisma.inquiry.create({
      data: createInquiryDto,
    });
  }

  async findAll() {
    return this.prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.inquiry.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.inquiry.delete({
      where: { id },
    });
  }
}
