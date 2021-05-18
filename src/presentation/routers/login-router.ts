export class MissingParamError extends Error {
  constructor (private paramName: string) {
    super(`Missing param "${paramName}"`)
    this.name = 'MissingParamError'
  }
}

export class ServerError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'ServerError'
  }
}

interface ResponseData {
  body: unknown | MissingParamError
  statusCode: number
}

class HttpResponse {
  constructor (private b?: string) {}

  static badRequest (paramName: string): ResponseData {
    return {
      body: new MissingParamError(paramName),
      statusCode: 400
    }
  }

  static serverError (): ResponseData {
    return {
      body: new ServerError(),
      statusCode: 500
    }
  }

  static success (body: unknown): ResponseData {
    return {
      body: body,
      statusCode: 201
    }
  }
}

interface IHttpContext {
  body: {
    email: string
    password: string
  }
}

export class LoginRouter {
  constructor (private b?: string) {}

  route (httpContext: IHttpContext): ResponseData {
    if (!httpContext || !httpContext.body) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpContext.body

    if (!email) {
      return HttpResponse.badRequest('email')
    }

    if (!password) {
      return HttpResponse.badRequest('password')
    }

    return HttpResponse.success({})
  }
}
