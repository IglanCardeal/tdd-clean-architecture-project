export class ParamError {
  constructor (private param: string) {}

  getParam () {
    return this.param
  }
}

// validatores de dados puros
function validateString (email: string): boolean {
  return true
}

function validateEmail (email: string): boolean {
  return true
}

function validateName (name: string): boolean {
  return true
}
// ==========================

export class Email {
  // instância somente dentro da factory
  private constructor (private readonly email: string) {
    Object.freeze(this)
  }

  static createEmailFactory (email: string): any {
    if (!validateEmail(email) || !validateString(email)) {
      return new ParamError('email')
    }

    return new Email(email)
  }

  get value (): string {
    return this.email
  }
}

export class Name {
  private constructor (private readonly name: string) {}

  static createNameFactory (name: string): Name | ParamError {
    if (!validateString(name) || !validateName(name)) {
      return new ParamError('name')
    }

    return new Name(name)
  }
}
