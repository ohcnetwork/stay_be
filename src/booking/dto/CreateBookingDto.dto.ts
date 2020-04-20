import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class CreateBookingDto {

    @ApiModelProperty({ example:null })
    roomid:number;

    @ApiModelProperty({ example:null })
    //@IsDate()
    checkin:string;

    //@IsDate()
    @ApiModelProperty({ example:null })
    checkout:string;

}