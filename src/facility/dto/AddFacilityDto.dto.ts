import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength } from 'class-validator';

export class AddFacilityDto {
    @ApiModelProperty({ example:null })
    @IsString()
    hotelName:string;

    @ApiModelProperty({ example:null })
    @IsString()
    hotelOwnerId:number;

    @ApiModelProperty({ example:null })
    @IsString()
    address:string;

    @ApiModelProperty({ example:null })
    @IsString()
    panchayath:string;

    @ApiModelProperty({ example:null })
    @IsString()
    district:string;


    @ApiModelProperty({ example:null })
    starCategory:number;

    @ApiModelProperty({ example:null })
    @IsString()
    latitude:string;

    @ApiModelProperty({ example:null })
    @IsString()
    longitude:string;

    @ApiModelProperty({ example:null })
    @IsString()
    facilityDescription:string;

}