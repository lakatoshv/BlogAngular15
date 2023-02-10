/**
 * User model.
 */
export class User {
    /**
     * User Id
     * @param Id number
     * User User Name
     * @param UserName string
     * User Email
     * @param Email string
     * User Email Confirmed
     * @param EmailConfirmed boolean
     * User First Name
     * @param FirstName string
     * User Last Name
     * @param LastName string
     * User Phone Number
     * @param PhoneNumber string
     * User Phone Number Confirmed
     * @param PhoneNumberConfirmed boolean
     * User Roles
     * @param Roles Array<string>
     * User Password
     * @param Password string
     * User About
     * @param About string
     */
    constructor(
        public Id: number,
        public UserName: string,
        public Email?: string,
        public EmailConfirmed: boolean = false,
        public FirstName?: string,
        public LastName?: string,
        public PhoneNumber?: string,
        public PhoneNumberConfirmed: boolean = false,
        //public ProfileImg?: string,
        public Roles: Array<string> = [],
        public Password?: string,
        public About?: string
    ) { }
}

function f(x: any): any {
    let tmp: any = x;
    delete tmp.prop;
    return tmp;
  }
