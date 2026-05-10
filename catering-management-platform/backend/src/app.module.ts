import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    InquiriesModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
