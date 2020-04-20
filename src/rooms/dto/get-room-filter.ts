import {IsOptional, IsNotEmpty} from 'class-validator';

export class GetRoomsFilterDto{
    @IsOptional()
    category:string;

    @IsNotEmpty()
    checkin:Date;

    @IsNotEmpty()
    checkout:Date;

    @IsOptional()
    hotelid:number;

    @IsOptional()
    minimum:number;

    @IsOptional()
    district:string;

    @IsOptional()
    maximum:number;

    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    beds:number;

    @IsOptional()
    type:string;

    @IsOptional()
    roomid:number;
}