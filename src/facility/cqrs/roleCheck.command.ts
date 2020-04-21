export class RoleCheckCommand {
    constructor(
        public readonly userId: number,
        public readonly facilityId: number,
        public readonly Type: string
    ) {
    }
}
