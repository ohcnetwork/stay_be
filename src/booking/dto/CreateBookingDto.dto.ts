import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class CreateBookingDto {

    @ApiModelProperty({ example:null })
    roomid:number;

    @ApiModelProperty({ example:null })
    //@IsDate()
    checkin:Date;

    //@IsDate()
    @ApiModelProperty({ example:null })
    checkout:Date;

}