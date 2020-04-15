import { ApiModelProperty } from '@nestjs/swagger';
import {  IsNumber } from 'class-validator';

export class UpdateRoomDto {
    @ApiModelProperty({ example:null })
    @IsNumber()
    hotelId:number;
}