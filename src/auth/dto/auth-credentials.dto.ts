import { UserRights } from "src/user/entities/user.entity";

export class AuthCredentialsDto {

  name: string;
  
  password: string;

  userRole: UserRights = UserRights.VIEWER;

  email: string;

}