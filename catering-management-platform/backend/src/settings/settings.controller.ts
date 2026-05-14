import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Post('bulk')
  bulkUpdate(@Body() settings: Array<{ key: string; value: string }>) {
    return this.settingsService.bulkUpdate(settings);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.settingsService.findByCategory(category);
    }
    return this.settingsService.findAll();
  }

  @Get('key/:key')
  findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(+id, updateSettingDto);
  }

  @Patch('key/:key')
  updateByKey(@Param('key') key: string, @Body() body: { value: string }) {
    return this.settingsService.updateByKey(key, body.value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.settingsService.remove(+id);
  }
}
