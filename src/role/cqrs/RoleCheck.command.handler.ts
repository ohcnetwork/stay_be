import {RoleCheckCommand} from "../../facility/cqrs/roleCheck.command";
import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {RoleService} from "../role.service";

@CommandHandler(RoleCheckCommand)
export class RoleCheckCommandHandler implements ICommandHandler<RoleCheckCommand> {
constructor(
    private readonly roleService: RoleService
) {
}
async execute(command: RoleCheckCommand) {
    const {userId, facilityId, Type} = command;
    return await this.roleService.checkRole(userId, Type , facilityId);
}
}
