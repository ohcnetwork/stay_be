import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength, IsOptional } from 'class-validator';

export class DeleteFacilityDto {
    @ApiModelProperty({ example:null })
    @IsString()
    hotelId:string;
}