import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength, IsOptional } from 'class-validator';

export class UpdateFacilityDto {

    @ApiModelProperty({ example:null })
    @IsString()
    hotelId:string;


    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly hotelName:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly address:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly panchayath:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly district:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    readonly rooms_Available:number;


    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly latitude:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly longitude:string;

//    @ApiModelProperty({ example:null })
//    @IsOptional()
//    readonly starCategory:number;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly facilityDescription:string;

//    @ApiModelProperty({ example:null })
//    @IsNumberString()
//    telephone:number;

}