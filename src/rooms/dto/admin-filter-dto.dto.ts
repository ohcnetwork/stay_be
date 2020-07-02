import { ApiModelProperty } from "@nestjs/swagger";

export class AdminFilterDto {
    @ApiModelProperty({example:null})
    district:string;
}