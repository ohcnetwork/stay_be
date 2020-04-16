import { ApiModelProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class UpdateRoleDto {
    

    @ApiModelProperty({ required: false,example:null })
    userId:number;

    @ApiModelProperty({ required: false,example:null })
    facilityId:number;

    @ApiModelProperty({ required: false,example:null })
    @IsString()
    role:string;
}
