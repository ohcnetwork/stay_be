import { Body,Controller,Post, Logger, Get, Patch,Request,ParseIntPipe, Param, Delete,UploadedFile, Req,UseGuards, UseInterceptors } from '@nestjs/common';
import { FacilityService } from './facility.service';
import {ApiBearerAuth, ApiUseTags} from '@nestjs/swagger';
import { AddFacilityDto,UpdateFacilityDto, SearchByDistrictDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {imageFileFilter} from './middleware/file-upload.utils';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = 'process.env.AWS_S3_BUCKET_NAME';
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


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

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get("/userFacilities")
    getFacility(@Req() req:any){
        this.logger.verbose('retrieving faclility of the user');
        return this.facilityService.getFacility(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('add-facility')
    @UseInterceptors(
        FilesInterceptor('file',5,{
        storage: multerS3({
          s3: s3,
          bucket: AWS_S3_BUCKET_NAME,
          acl: 'public-read',
          key: function(request, file, cb) {
            cb(null, `${Date.now().toString()} - ${file.originalname}`);
          },
        }),
        fileFilter: imageFileFilter,
      }),
      )
    addfacility(
    @Body() addfacilityDto: AddFacilityDto,
    @Req() req:any,
    @UploadedFile() file )
    {
        this.logger.verbose("facility created");
        return this.facilityService.addfacility(addfacilityDto,req.user,req.files);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteFacility(@Req() req:any,@Param('id',ParseIntPipe)id:number) {
        this.logger.verbose("facility removed");
        return this.facilityService.deleteFacility(req.user,id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id/update-Facility')
    updateFacility(
        @Req() req:any,
        @Param('id',ParseIntPipe) id:number,
        @Body() updateFacilityDto: UpdateFacilityDto) {
        this.logger.verbose("facility updated");
        return this.facilityService.updateFacility(req.user,id,updateFacilityDto);
    }
    

    @Post('search-District')
    searchDistrict(@Body() searchByDistrictDto:SearchByDistrictDto) {
        this.logger.verbose("searching by district");
        return this.facilityService.searchDistrict(searchByDistrictDto);
    }
    @Get('/get/districts')
    getPrice():Promise<any>{

        return this.facilityService.getDistricts();
    }

}
