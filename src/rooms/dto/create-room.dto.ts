import {IsNotEmpty} from 'class-validator';

export class CreateRoomDto{
    // @IsNotEmpty()
    // hotelId:number;

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    features:string;

    description:string;

    category:string;

    beds:number;
    
    photos:string;

    @IsNotEmpty()
    cost:number;


}