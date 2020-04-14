import {RoomStatus} from '../room-status.enum';
import {IsOptional, IsNotEmpty} from 'class-validator';

export class GetRoomsFilterDto{
    @IsOptional()
    category:string;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}