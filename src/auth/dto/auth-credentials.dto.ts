import { UserRights } from "src/user/entities/user.entity";

export class AuthCredentialsDto {

  username: string;
  
  password: string;

  email: string;

  userRole: UserRights;

}