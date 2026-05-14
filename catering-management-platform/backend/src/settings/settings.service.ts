import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createSettingDto: CreateSettingDto) {
    return this.prisma.websiteSettings.create({
      data: createSettingDto,
    });
  }

  async findAll() {
    return this.prisma.websiteSettings.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }],
    });
  }

  async findByCategory(category: string) {
    return this.prisma.websiteSettings.findMany({
      where: { category },
      orderBy: { key: 'asc' },
    });
  }

  async findByKey(key: string) {
    return this.prisma.websiteSettings.findUnique({
      where: { key },
    });
  }

  async findOne(id: number) {
    return this.prisma.websiteSettings.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSettingDto: UpdateSettingDto) {
    return this.prisma.websiteSettings.update({
      where: { id },
      data: updateSettingDto,
    });
  }

  async updateByKey(key: string, value: string) {
    return this.prisma.websiteSettings.update({
      where: { key },
      data: { value },
    });
  }

  async remove(id: number) {
    return this.prisma.websiteSettings.delete({
      where: { id },
    });
  }

  async bulkUpdate(settings: Array<{ key: string; value: string }>) {
    const updates = settings.map((setting) =>
      this.prisma.websiteSettings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: {
          key: setting.key,
          value: setting.value,
          category: this.getCategoryFromKey(setting.key),
        },
      })
    );
    return Promise.all(updates);
  }

  private getCategoryFromKey(key: string): string {
    if (key.startsWith('hero_')) return 'hero';
    if (key.startsWith('about_')) return 'about';
    if (key.startsWith('contact_')) return 'contact';
    if (key.startsWith('stats_')) return 'stats';
    if (key.startsWith('services_')) return 'services';
    if (key.startsWith('home_')) return 'home';
    if (key.startsWith('gallery_')) return 'gallery';
    if (key.startsWith('testimonials_')) return 'testimonials';
    return 'general';
  }
}
