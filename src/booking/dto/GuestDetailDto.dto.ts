import { ApiModelProperty } from "@nestjs/swagger";
import { IsOptional,  IsIn } from "class-validator";



export class GuestDetailDto {
  

    @ApiModelProperty({ example:null })
     name:string;

    @ApiModelProperty()
     age:number;

    @ApiModelProperty()
    @IsIn(["MALE","FEMALE", "OTHER"])
    gender:string;

     @ApiModelProperty({ required: false, example: null })
    @IsOptional()
   
   number:number;

    
}
