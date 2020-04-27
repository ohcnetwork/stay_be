import { ApiModelProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class GuestDetailDto {
  

    @ApiModelProperty({ example:null })
    readonly name:string;

    @ApiModelProperty()
    readonly age:number;

    @ApiModelProperty()
    readonly gender:string;

     @ApiModelProperty({ required: false, example: null })
    @IsOptional()
    readonly number:number;

    
}
