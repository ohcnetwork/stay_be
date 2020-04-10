import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiModelProperty({ example: null })
  @IsString()
  name: string;

  @ApiModelProperty({ example: null })
  @IsString()
  email: string;

  @ApiModelProperty({ example: null })
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, { message: 'Password too Weak' })
  readonly password: string;

  @ApiModelProperty({ example: null })
  @IsString()
  confirmPassword: string;
}
