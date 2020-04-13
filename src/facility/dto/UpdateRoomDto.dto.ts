import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength } from 'class-validator';

export class UpdateRoomDto {
    @ApiModelProperty({ example:null })
    @IsString()
    hotelId:string;
}