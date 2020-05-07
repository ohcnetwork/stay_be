import { ApiModelProperty } from "@nestjs/swagger";
import { IsDate, IsDateString } from "class-validator";
import { GuestDetailDto } from "./GuestDetailDto.dto";
import { Type } from "@nestjs/common";

export class CreateBookingDto {

    @ApiModelProperty({ example:null })
    roomid:number;

    @ApiModelProperty({ example:null })
   // @IsDateString()
    checkin:Date;

    //@IsDate()
    @ApiModelProperty({ example:null })
    //@IsDate()
    checkout:Date;

    @ApiModelProperty({
        type: GuestDetailDto,
        isArray: true,
      })
      readonly guestdetails: GuestDetailDto[];

}
function format(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }
}