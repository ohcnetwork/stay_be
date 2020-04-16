import { Body,Controller,Post, Logger, Get, Put,Request, Param,ParseIntPipe, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto';

@ApiUseTags('Role Management')
@Controller('api/v1/role')
export class RoleController {
    private logger = new Logger('Role Controller');
    constructor(private readonly roleService: RoleService) {}

    @Get("all-roles")
    getAllRoles(@Request() req: any) {
        this.logger.verbose(`retrieving all roles`);
        return this.roleService.getAllRoles(req);
    }

    @Get("/:id")
    getUserRole(@Param('id',ParseIntPipe) id:number): Promise<any>{
        return this.roleService.getUserRole(id);
    }
    @Post("add-role")
    addRoles(@Body() addRoleDto: AddRoleDto) {
        this.logger.verbose('adding new role');
        return this.roleService.addRoles(addRoleDto);
    }
    @Delete("/:id")
    deleteRole(@Param('id',ParseIntPipe) id:number): Promise<any>{
        this.logger.verbose('deleting a role');
        return this.roleService.deleteRole(id);
    }

}
