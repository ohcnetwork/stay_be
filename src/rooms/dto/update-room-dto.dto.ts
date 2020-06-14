import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { RoomStatus } from '../room-status.enum';

export class UpdateRoomDto {

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly title:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly features:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly descriptions:string;

    @ApiModelProperty({ required:false, example:null })
    @IsOptional()
    @IsString()
    readonly category:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    photos:any;

    @ApiModelProperty({ example:null })
    @IsOptional()
    readonly beds:number;

    @ApiModelProperty({ example:null })
    @IsOptional()
    readonly cost:number;

    @ApiModelProperty({ example:null })
    @IsNotEmpty()
    readonly ids:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    status:RoomStatus;

}
