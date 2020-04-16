import { ApiModelProperty } from '@nestjs/swagger';
import { IsString} from 'class-validator';

export class AddRoleDto {
    

    @ApiModelProperty({ example:null })
    @IsString()
    userId:string;

    @ApiModelProperty({ example:null })
    @IsString()
    facilityId:string;

    @ApiModelProperty({ example:null })
    @IsString()
    role:string;
}
