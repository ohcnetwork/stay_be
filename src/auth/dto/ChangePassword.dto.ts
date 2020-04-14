import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiModelProperty({example: null})
  id:number;  //added for testing
    
  @ApiModelProperty({ example: null })
  @IsString()
  readonly currentPassword: string;


  @ApiModelProperty({ example: null })
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, { message: 'Password too Weak' })
  readonly password: string;


  @ApiModelProperty({ example: null })
  @IsString()
  @MinLength(8)
  @MaxLength(49)
  @Matches(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]).{8,}$/, { message: 'Password too Weak' })
  readonly confirm: string;
}
