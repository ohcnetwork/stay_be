import {IsNotEmpty} from 'class-validator';

export class CreateRoomDto{
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    features:string;

    description:string;

    category:string;
    beds:number;
    photos:string;

    @IsNotEmpty()
    cost:number;

    policy:string;
}