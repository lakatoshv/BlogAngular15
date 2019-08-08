export class User {
    constructor(
        public Id: number,
        public UserName: string,

        public Email?: string,
        public FirstName?: string,
        public LastName?: string,
        public PhoneNumber?: string,
        //public ProfileImg?: string,
        public Roles: Array<string> = [],
        public Password?: string,
        public About?: string
    ) { }
}