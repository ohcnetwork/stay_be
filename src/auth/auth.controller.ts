import { Body, Controller, Get, Request, Logger, Post, UseGuards, Put } from '@nestjs/common';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ChangePasswordDto } from './dto';
import { AuthGuard } from '@nestjs/passport';


@ApiUseTags('Auth Management')
@Controller('api/v1/auth')
export class AuthController {
  private logger = new Logger('Auth Controller');
  constructor(private readonly authService: AuthService) {
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Request() req: any) {
    this.logger.verbose(`User Retrieved `);
    return this.authService.getUser(req);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('all-users')
  getAllUsers(@Request() req: any) {
    this.logger.verbose(`User retrieving all users `);
    return this.authService.getAllUsers(req);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: any, @Body() body: LoginDto) {
    this.logger.verbose(`user Logged in ${req.user.email}`);
    return this.authService.login(req.user, body);
  }


  @Post('register')
  register(@Body() registerDto: RegisterDto):Promise<any>{
    this.logger.verbose('New user Created');
    return this.authService.register(registerDto);
  }
  
  @Put('changepassword')
  changePass(@Body() changePasswordDto: ChangePasswordDto){
    this.logger.verbose("Password Changed Successfully");
    return this.authService.changePassword(changePasswordDto);
  }


}
