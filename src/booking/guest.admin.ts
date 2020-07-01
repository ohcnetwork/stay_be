import { AdminEntity } from "nestjs-admin"
import { GuestDetail } from "./entities/GuestDetail.entity"

export class GuestAdmin extends AdminEntity {
    entity = GuestDetail
    listDisplay = [
        'id',
        'name',
        'age'

    ]
    searchFields = ['id','name']
}