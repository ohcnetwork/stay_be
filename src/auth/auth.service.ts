import {Injectable, Logger, UnauthorizedException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import * as bcrypt from 'bcryptjs';
import {JwtService} from '@nestjs/jwt';
import {User} from './entities/User.entity';
import {ChangePasswordDto, ForgetPasswordDtoDto, ResetPasswordDto} from './dto';
import * as uuidv1 from 'uuid/v1';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {
  private logger = new Logger('Auth Service');

  constructor(
      @InjectRepository(UserRepository)
      private readonly userRepository: UserRepository,
      private readonly jwtService: JwtService,
      private readonly mailerService: MailerService
  ) {
  }

  async getAllUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  async getUser(req: any): Promise<any> {
    const {id} = req.user;
    const user = await this.userRepository.findOne({id});
    this.logger.verbose(`User Logged In ${user.name}`);
    if (user) {
      const {...result} = user;
      return {
        success: true,
        message: 'Success',
        data: result,
      };
    }
    throw new UnauthorizedException();
  }


  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({email});
      console.log('user', user);
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return user;
        }
      }
      return null;
    } catch (err) {
      global.console.log('err', err);
      return {
        success: false,
        message: 'Something went wrong..! Login failed.',
      };
    }
  }

  async register(data: any): Promise<any> {
    try {
      if (data.password !== data.confirm) {
        return {
          success: false,
          message: 'Error',
          data: {
            confirm: 'Password and confirm password must be same.',
          },
        };
      }
      const user = await this.userRepository.findOne({email: data.email});
      if (!user) {
        data.password = await bcrypt.hash(data.password, 10);
        data.status = 'ACTIVE';

        const registerUser = await this.userRepository.save(data);
        const {...result} = registerUser;
        return {
          success: true,
          message: 'Success',
          data: result,
        };
      }
      return {
        success: false,
        message: 'Error',
        data: {
          uniqueId: 'User already exist, please login.',
        },
      };
    } catch (e) {
      global.console.log('err', e);
      return {
        success: false,
        message: 'Something went wrong..! Registration failed.',
      };
    }
  }


  async login(user: any) {
    const {email, id} = user;
    const payload = {email, id};
    return {
      success: true,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload)
    }
  }

  async changePassword(user: User, data: ChangePasswordDto): Promise<any> {
    const id = user.id;
    const found = await this.userRepository.findOne({id});
    const match = await bcrypt.compare(data.currentPassword
        , found.password);
    if (!match) {
      return {
        success: false,
        message: 'Error',
        data: {
          confirmPassword: 'Current Password is incorrect'
        },
      }
    }
    if (data.password === data.confirm) {
      found.password = await bcrypt.hash(data.password, 10);
      await this.userRepository.save(found);
      return {
        success: true,
        message: 'Success'
      };
    }
    return {
      success: false,
      message: 'Error',
      data: {
        confirmPassword: 'Password and confirm Password must be same'
      },
    };
  }

  async resetPass(data: any): Promise<any> {
    const user = await this.userRepository.findOne({resetToken: data.token});
    if(user) {
      if (data.password === data.confirm) {
        user.password = await bcrypt.hash(data.password, 10);
        user.resetToken = null;
        const fetchUser = await this.userRepository.save(user);
        const {password, ...result} = fetchUser;
        return {
          success: true,
          message: 'Success',
          data: result
        };
      }
      return {
        success: false,
        message: 'Error',
        data: {
          confirm: 'Password and confirm password must be same'
        },
      };
    }
     return {
      success: false,
       message: 'Error',
       data: {
        token : 'Invalid Token'
       }
    }
  }

  async forgetPassword(data: ForgetPasswordDtoDto): Promise<any> {
    const user = await this.userRepository.findOne({email: data.email});
    if (user) {
      const token = uuidv1();
      return await this.mailerService.sendMail({
        to: data.email.toLowerCase(),
        from: process.env.FROM,
        subject: 'Reset Password Link',
        template: 'forgotPwd',
        context: {
          link: ` ${process.env.HOSTNAME}/reset-password/${token}`,
          email: user.email,
          userName: user.name
        }
      })
          .then(async () => {
            user.resetToken = token;
            await this.userRepository.save(user);
            return {
              success: true,
              message: 'An email has been send to reset the password'
            };
          }).catch(() => {
            return {
              success: false,
              message: 'Something went wrong...!'
            };
          });
    }
   throw new NotFoundException("user not found")
  }
}
