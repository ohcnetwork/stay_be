import {IsNotEmpty,IsOptional} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
export class CreateRoomDto{

    @ApiModelProperty({ example:null })
    @IsNotEmpty()
    title:string;

    @ApiModelProperty({ example:null})
    @IsNotEmpty()
    features:string;

    @ApiModelProperty({ example:null})
    description:string;

    @ApiModelProperty({ example:null})
    @IsNotEmpty()
    category:string;
    
    @ApiModelProperty({ example:null})
    @IsNotEmpty()
    beds:number;

    @ApiModelProperty({ example:null})
    @IsNotEmpty()
    noOfRooms:number;

    @ApiModelProperty({ example:null})
    @IsNotEmpty()
    cost:number;
}