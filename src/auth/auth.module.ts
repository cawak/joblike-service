import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/controller/authentication.controller';
import { UserService } from './user/user.service';
import { AuthenticationService } from './authentication/service/authentication.service';
import { LocalStrategy } from './authentication/service/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../core/constants/jwt.constant';
import { JwtStrategy } from '../gateway/security/strategy/jwt.strategy';
import { CoreModule } from 'src/core/core.module';


@Module({
  imports: [
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [UserService, AuthenticationService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
