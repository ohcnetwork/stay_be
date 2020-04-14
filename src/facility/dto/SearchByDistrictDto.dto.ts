import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength, IsOptional } from 'class-validator';

export class SearchByDistrictDto {
    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly district:string;
}