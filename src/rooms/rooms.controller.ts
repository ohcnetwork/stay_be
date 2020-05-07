import { Controller, Get ,Post, Body,Param, Delete,Patch,Query, ValidationPipe, UsePipes, ParseIntPipe,UseGuards,UseInterceptors, UploadedFile,Req} from '@nestjs/common';
import {RoomsService} from './rooms.service';
import {CreateRoomDto} from './dto/create-room.dto';
import { GetRoomsFilterDto } from './dto/get-room-filter';
import {RoomStatusValidationPipe} from './pipes/room-status-validation.pipe'
import { Room } from './entity/room.entity';
import { RoomStatus } from './room-status.enum';
import { ApiUseTags,ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {imageFileFilter} from './middleware/file-upload.utils';
import { UpdateRoomDto } from './dto/update-room-dto.dto';
const AWS = require('aws-sdk');
import * as multerS3 from 'multer-s3';
import { DeleteRoom } from './dto/delete-room.dto';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@ApiUseTags('Rooms Management')
@Controller('api/v1/rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get('/')
    getRooms(@Query(ValidationPipe) filterDto:GetRoomsFilterDto){
        return this.roomsService.getRooms(filterDto);
    }

    @Get('/:id')
    getRoomById(@Param('id',ParseIntPipe) id:number):Promise<Room>{
        return this.roomsService.getRoomById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post('/:hotelid')
    @UsePipes(ValidationPipe)
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

        createRoom(
        @Req() req:any,
        @Param('hotelid') id:number,
        @UploadedFile() file,
        @Body() createRoomDto : CreateRoomDto,
    ):Promise<Room>
    { 
        return this.roomsService.createRoom(req.user,createRoomDto,id,req.files);  
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Delete('/deleteroom')
    deleteRoom(@Req() req:any,@Body() body:DeleteRoom):Promise<void>{

        return this.roomsService.deleteRoom(req.user,body);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch('/status/:id')
    updateRoomStatus(
      @Req() req:any,
     @Param('id',ParseIntPipe)id:number,
     @Body('status',RoomStatusValidationPipe) status:RoomStatus):Promise<Room>
     {
            return this.roomsService.updateRoomStatus(req.user,id,status);
     } 
     @Get('/hotel/:hotelId')
	 getHotelDetail(@Param('hotelId',ParseIntPipe) hotelId: number): Promise<any> {
		 return this.roomsService.getHotelDetail(hotelId);
	 }
	 @Get('/hotelid/:facilityId')
	 getHotelId(@Param('facilityId',ParseIntPipe) facilityId:number):Promise<any> {
		 return this.roomsService.getHotelId(facilityId);
     }
     @Get('/get/details')
     getPrice():Promise<any>{

         return this.roomsService.getPrice();
     }

    //EDIT ROOM API
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Patch('/update-rooms')
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
    updateRooms(
        @Req() req:any,
        @Body()updateRoomDto: UpdateRoomDto,
        @UploadedFile() file )
        {
            return this.roomsService.updateRooms(req.user,updateRoomDto,req.files);
        }

}
