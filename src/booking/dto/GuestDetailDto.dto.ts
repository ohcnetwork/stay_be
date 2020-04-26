import { ApiModelProperty } from "@nestjs/swagger";


export class GuestDetailDto {
  

    @ApiModelProperty({ example:null })
    readonly name:string;

    @ApiModelProperty({ example:null })
    readonly age:number;

    @ApiModelProperty({ example:null })
    readonly gender:string;

    @ApiModelProperty({ example:null })
    readonly number:number;

    
}