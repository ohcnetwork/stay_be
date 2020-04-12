import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiModelProperty({ example: null })
  @IsString()
  name: string;

  @ApiModelProperty({ example: null })
  @IsString()
  email: string;

  @ApiModelProperty({ required: false, example: null })
  @IsOptional()
  @IsString()
  readonly token: string;

  @ApiModelProperty({ example: null })
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, { message: 'Password too Weak' })
  password: string;

  @ApiModelProperty({ example: null })
  @IsString()
  confirm: string;
}
