import { Body,Controller,Post, Logger, Get, Patch,Request,ParseIntPipe, Param, Delete } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AddFacilityDto,UpdateFacilityDto, SearchByDistrictDto } from './dto';

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
    getAllFacility() {
        this.logger.verbose(`retrieving all facilities`);
        return this.facilityService.getAllFacility();
    }

    @Get("/:id")
    getFacility(@Param('id',ParseIntPipe) id:number){
        this.logger.verbose('retrieving faclility of the user');
        return this.facilityService.getFacility(id);
    }

    @Post('add-facility')
    addfacility(@Body() addfacilityDto: AddFacilityDto) {
        this.logger.verbose("facility created");
        return this.facilityService.addfacility(addfacilityDto);
    }

    @Delete('/:id')
    deleteFacility(@Param('id',ParseIntPipe)id:number) {
        this.logger.verbose("facility removed");
        return this.facilityService.deleteFacility(id);
    }

    @Patch('/:id/update-Facility')
    updateFacility(
        @Param('id',ParseIntPipe) id:number,
        @Body() updateFacilityDto: UpdateFacilityDto) {
        this.logger.verbose("facility updated");
        return this.facilityService.updateFacility(id,updateFacilityDto);
    }
    
    @Post('search-District')
    searchDistrict(@Request() req: any,@Body() searchByDistrictDto:SearchByDistrictDto) {
        this.logger.verbose("searching by district");
        return this.facilityService.searchDistrict(req.facility,searchByDistrictDto);
    }
    @Get('/get/districts')
    getPrice():Promise<any>{

        return this.facilityService.getDistricts();
    }

}
