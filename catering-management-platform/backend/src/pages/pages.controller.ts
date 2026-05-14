import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.pagesService.findOne(slug);
  }

  @Patch(':slug/toggle')
  togglePage(@Param('slug') slug: string, @Body() body: { isEnabled: boolean }) {
    return this.pagesService.togglePage(slug, body.isEnabled);
  }

  @Patch(':slug')
  updatePage(@Param('slug') slug: string, @Body() data: any) {
    return this.pagesService.updatePage(slug, data);
  }

  @Post('sections')
  createSection(@Body() data: any) {
    return this.pagesService.createSection(data);
  }

  @Patch('sections/:id')
  updateSection(@Param('id') id: string, @Body() data: any) {
    return this.pagesService.updateSection(+id, data);
  }

  @Delete('sections/:id')
  deleteSection(@Param('id') id: string) {
    return this.pagesService.deleteSection(+id);
  }
}
