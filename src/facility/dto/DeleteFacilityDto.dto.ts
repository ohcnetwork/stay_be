import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteFacilityDto {
    @ApiModelProperty({ example:null })
    @IsString()
    hotelId:string;
}