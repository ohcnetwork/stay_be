import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString ,Matches, MinLength } from 'class-validator';

export class AddStayDto {
    @ApiModelProperty({ example:null })
    @IsString()
    name:string;

    @ApiModelProperty({ example:null })
    @IsString()
    address:string;

    @ApiModelProperty({ example:null })
    @IsString()
    type:string;

    @ApiModelProperty({ example:null })
    @IsNumberString()
    rooms_Available:number;

    @ApiModelProperty({ example:null })
    @IsNumberString()
    star_category:number;

    @ApiModelProperty({ example:null })
    @IsString()
    stay_Description:string;

    @ApiModelProperty({ example:null })
    @IsNumberString()
    telephone:number;

}