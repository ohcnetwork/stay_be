import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString , IsOptional } from 'class-validator';

export class UpdateFacilityDto {

    @ApiModelProperty({ example:null })
    @IsOptional()
    hotelId:number;


    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly name:string;

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
    readonly policy:string;


    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly latitude:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly longitude:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    readonly starCategory:number;

    @ApiModelProperty({ example:null })
    @IsOptional()
    @IsString()
    readonly facilities:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    contact:string;

    @ApiModelProperty({ example:null })
    @IsOptional()
    photos:any;

    @ApiModelProperty({ example:null })
    @IsOptional()
    status:string;

}