import { Body, Controller, Get, Request, Logger, Post, UseGuards, Put,Req } from '@nestjs/common';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ChangePasswordDto,ResetPasswordDto, ForgetPasswordDtoDto } from './dto';
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
  

  
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req,@Body() loginDto:LoginDto) {
      this.logger.verbose(`user Logged in ${req.user.email}`);
      return this.authService.login(req.user);
    }
  
  
    @Post('register')
    register(@Body() registerDto: RegisterDto):Promise<any>{
      return this.authService.register(registerDto);
    }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  changePass(@Request() req: any, @Body() changePasswordDto: ChangePasswordDto){
    this.logger.verbose("Password Changed Successfully");
    return this.authService.changePassword(req.user,changePasswordDto);
  }

@Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto){
    return this.authService.resetPass(body);
}

@Post('forget-password')
  forgotPassword(@Body() body: ForgetPasswordDtoDto) {
    this.logger.verbose("Forgot Password function called");
    return this.authService.forgetPassword(body);
}
}
