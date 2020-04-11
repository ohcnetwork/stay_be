import { Body,Controller,Post, Logger, Get, Put } from '@nestjs/common';
import { StayService } from './stay.service';
import { AddStayDto,UpdateRoomDto } from './dto';


@Controller('api/v1/stay')
export class StayController {
    private logger = new Logger('Stay Controller');
    constructor(private readonly stayService: StayService) {}

    @Get()
    gethello(): string {
        this.logger.verbose("in stay api")
        return this.stayService.gethello();
    }
    
    @Post('add')
    addStay(@Body() addStayDto: AddStayDto) {
        this.logger.verbose("stay created");
        return this.stayService.addStay(addStayDto);
    }

    @Put('updateroom')
    updateRooms(@Body() updateRoomDto: UpdateRoomDto) {
        this.logger.verbose("room availability updated")
        return this.stayService.updateRooms(updateRoomDto);
    }

}
