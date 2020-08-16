import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './passport-strategies/jwt.strategy';
import { FacebookStategy } from './passport-strategies/facebook.strategy';
import { AdminSessionSerializer } from './passport-strategies/admin-session-serializer.strategy';
import { AuthviewController } from './auth-view.controller';
import { AdminLoginStrategy } from './passport-strategies/admin-login-local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
      }),
    }),
    AdminModule,
    UsersModule,
    SessionModule,
    RoleModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    JWTStrategy,
    FacebookStategy,
    AdminSessionSerializer,
    AdminLoginStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthviewController],
})
export class AuthModule {}
