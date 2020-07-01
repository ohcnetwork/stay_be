import { AdminEntity } from "nestjs-admin"
import { User } from "./entities/User.entity"

export class UserAdmin extends AdminEntity {
    entity = User
    listDisplay = [
        'id',
        'name',
        'email',
        'type'
        
    ]
    searchFields = ['id','name','email']
}