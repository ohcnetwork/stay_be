import { AdminEntity } from "nestjs-admin"
import { Booking } from "./entities/Booking.entity"

export class BookingAdmin extends AdminEntity {
    entity = Booking
    listDisplay = [
        'book_id',
        'checkin',
        'checkout',
    ]
    searchFields = ['book_id','checkin','checkout']
}