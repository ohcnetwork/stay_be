import { AdminEntity } from "nestjs-admin"

import { Room } from "./entity/room.entity"

export class RoomAdmin extends AdminEntity {
    entity = Room
    listDisplay = [
        'title',
        'beds',
        'cost',
    ]
    searchFields = ['title',
    'beds',
    'cost'
    ]
}