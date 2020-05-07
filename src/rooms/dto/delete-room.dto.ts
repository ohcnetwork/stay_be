import {IsOptional, IsNotEmpty, IsArray} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
export class DeleteRoom{

    @ApiModelProperty({example:null})
    roomid:string[];
}