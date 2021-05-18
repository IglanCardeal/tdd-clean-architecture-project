// interface UserData {
//   name: string
//   email: string
// }

// class User {
//   constructor (private readonly email: string, private readonly name: string) {}

//   static create (userData: UserData): any {
//     // ...

//     return new User(userData.email, userData.name)
//   }
// }

import { Email, Name, ParamError } from './Email'

interface UserData {
  name: string
  email: string
}

class User {
  private constructor (
    private readonly email: Email,
    private readonly name: Name
  ) {}

  static create (userData: UserData): User | ParamError {
    // ...
    const email: Email | ParamError = Email.createEmailFactory(userData.email)

    if (email instanceof ParamError) {
      return email
    }

    const name: Name | ParamError = Name.createNameFactory(userData.name)

    if (name instanceof ParamError) {
      return name
    }

    return new User(email, name)
  }
}
