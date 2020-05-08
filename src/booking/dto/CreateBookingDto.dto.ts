import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate, IsDateString } from "class-validator";
import { GuestDetailDto } from "./GuestDetailDto.dto";
import { Type } from "@nestjs/common";

export class CreateBookingDto {

    @ApiModelProperty({ example:null })
    roomid:number;

    @ApiModelProperty({ example:null })
    //@IsDateString()
    checkin:Date;

    //@IsDate()
    @ApiModelProperty({ example:null })
   // @IsDate()
    checkout:Date;

    @ApiModelProperty({
        type: GuestDetailDto,
        isArray: true,
      })
       guestdetails: GuestDetailDto[];

}
