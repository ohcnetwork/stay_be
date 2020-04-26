import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { GuestDetailDto } from "./GuestDetailDto.dto";

export class CreateBookingDto {

    @ApiModelProperty({ example:null })
    roomid:number;

    @ApiModelProperty({ example:null })
    //@IsDate()
    checkin:string;

    //@IsDate()
    @ApiModelProperty({ example:null })
    checkout:string;

    @ApiModelProperty({
        type: GuestDetailDto,
        isArray: true,
      })
      readonly guestdetails: GuestDetailDto[];

}