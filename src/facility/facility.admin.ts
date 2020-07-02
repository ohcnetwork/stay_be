import { AdminEntity } from "nestjs-admin"
import { Facility } from "./entities/Facility.entity"

export class FacilityAdmin extends AdminEntity {
    entity = Facility
    listDisplay = [
        'name',
        'address',
        'district',
        'ownerID',
        'facilities',
        'starCategory'
        
    ]
    searchFields = ['name','ownerID','district','starCategory']
}