import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.page.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(slug: string) {
    const page = await this.prisma.page.findUnique({
      where: { slug },
    });
    
    const sections = await this.prisma.pageSection.findMany({
      where: { pageSlug: slug },
      orderBy: { order: 'asc' },
    });

    return { ...page, sections };
  }

  async togglePage(slug: string, isEnabled: boolean) {
    return this.prisma.page.update({
      where: { slug },
      data: { isEnabled },
    });
  }

  async updatePage(slug: string, data: any) {
    return this.prisma.page.update({
      where: { slug },
      data,
    });
  }

  async updateSection(id: number, data: any) {
    return this.prisma.pageSection.update({
      where: { id },
      data,
    });
  }

  async createSection(data: any) {
    return this.prisma.pageSection.create({ data });
  }

  async deleteSection(id: number) {
    return this.prisma.pageSection.delete({
      where: { id },
    });
  }
}
