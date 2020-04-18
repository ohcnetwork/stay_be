import {IsOptional, IsNotEmpty} from 'class-validator';

export class GetRoomsFilterDto{
    @IsOptional()
    category:string;

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
}