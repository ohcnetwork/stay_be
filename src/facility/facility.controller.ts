import { Body,Controller,Post, Logger, Get, Put,Request } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AddFacilityDto,UpdateRoomDto } from './dto';

@ApiUseTags('Facility Management')
@Controller('api/v1/facility')
export class FacilityController {
    private logger = new Logger('Facility Controller');
    constructor(private readonly facilityService: FacilityService) {}

    @Get()
    gethello(): string {
        this.logger.verbose("in Facility api")
        return this.facilityService.gethello();
    }
    
    @Get("all-facility")
    getAllStay(@Request() req: any) {
        this.logger.verbose(`retrieving all facilities`);
        return this.facilityService.getAllStay(req);
    }


    @Post('add-facility')
    addfacility(@Body() addfacilityDto: AddFacilityDto) {
        this.logger.verbose("facility created");
        return this.facilityService.addfacility(addfacilityDto);
    }
    
/*    @Put('update-Roomavailability')
    updateRooms(@Request() req: any,@Body() updateRoomDto: UpdateRoomDto) {
        this.logger.verbose("room availability updated");
        return this.facilityService.updateRooms(req.facility,updateRoomDto);
    }*/

    @Post('deleteFacility')
    deleteFacility(@Request() req: any,@Body() updateRoomDto: UpdateRoomDto) {
        this.logger.verbose("facility removed");
        return this.facilityService.deleteFacility(req.facility,updateRoomDto);
    }


}
