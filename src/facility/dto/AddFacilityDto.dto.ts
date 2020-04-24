import { ApiModelProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

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
    facilities:string;

    @ApiModelProperty({ example:null })
    @IsString()
    contact:string;

    @ApiModelProperty({ example:null})
    @IsString()
    policy:string;

}