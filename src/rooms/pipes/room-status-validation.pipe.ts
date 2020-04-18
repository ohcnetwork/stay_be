import { PipeTransform, BadRequestException} from "@nestjs/common";
import { RoomStatus} from '../room-status.enum';
export class RoomStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        RoomStatus.AVAILABLE,
        RoomStatus.NOT_AVAILABLE,
        RoomStatus.UPDATING,
    ];
    transform(value:any){
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not a valid status.`);
        }

        return value;
    }
    private isStatusValid(status:any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}