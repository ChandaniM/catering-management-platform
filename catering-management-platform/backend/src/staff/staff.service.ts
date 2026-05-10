import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.staff.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.staff.findUnique({
      where: { id },
    });
  }

  async create(createStaffDto: CreateStaffDto) {
    return this.prisma.staff.create({
      data: {
        ...createStaffDto,
        joinDate: new Date(createStaffDto.joinDate),
      },
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data: {
        ...updateStaffDto,
        ...(updateStaffDto.joinDate && { joinDate: new Date(updateStaffDto.joinDate) }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
