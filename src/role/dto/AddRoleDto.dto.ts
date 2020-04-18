import { ApiModelProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class AddRoleDto {
    

    @ApiModelProperty({ example:null })
    userId:number;

    @ApiModelProperty({ example:null })
    facilityId:number;

    @ApiModelProperty({ example:null })
    @IsString()
    role:string;
}
