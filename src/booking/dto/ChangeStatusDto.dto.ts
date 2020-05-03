import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class ChangeStatusDto {
    @ApiModelProperty({ example:null })
    status:string;

    @ApiModelProperty({ example:null })
    roomNumber:string;


}