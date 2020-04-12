import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength } from 'class-validator';

export class AddFacilityDto {
    @ApiModelProperty({ example:null })
    @IsString()
    name:string;

    @ApiModelProperty({ example:null })
    @IsString()
    address:string;

    @ApiModelProperty({ example:null })
    @IsString()
    panchayath:string;

    @ApiModelProperty({ example:null })
    cost:number

    @ApiModelProperty({ example:null })
    rooms_Available:number;

    @ApiModelProperty({ example:null })
    star_category:number;

    @ApiModelProperty({ example:null })
    @IsString()
    latitude:string;

    @ApiModelProperty({ example:null })
    @IsString()
    longitude:string;

    @ApiModelProperty({ example:null })
    @IsString()
    stayDescription:string;

    @ApiModelProperty({ example:null })
    @IsNumberString()
    telephone:number;

}