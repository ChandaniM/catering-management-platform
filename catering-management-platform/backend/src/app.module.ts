import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { StaffModule } from './staff/staff.module';
import { ServicesModule } from './services/services.module';
import { GalleryModule } from './gallery/gallery.module';
import { ContentModule } from './content/content.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { SettingsModule } from './settings/settings.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    InquiriesModule,
    StaffModule,
    ServicesModule,
    GalleryModule,
    ContentModule,
    TestimonialsModule,
    SettingsModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
