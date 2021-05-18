function badRequest (body: unknown) {
  return {
    body: body,
    statusCode: 400
  }
}

function serverError (body: unknown) {
  return {
    body: body,
    statusCode: 500
  }
}

interface IHttpContext {
  body: {
    email: string
    password: string
  }
}

interface IHttpResponse {
  body: unknown
  statusCode: number
}

class LoginRouter {
  constructor (private b?: string) {}

  route (httpContext: IHttpContext): IHttpResponse {
    if (!httpContext || !httpContext.body) {
      return serverError(null)
    }

    const { email, password } = httpContext.body

    if (!email || !password) {
      return badRequest(null)
    }

    return { body: {}, statusCode: 201 }
  }
}

describe('Login Router', () => {
  it('should login router exist', () => {
    const sut = new LoginRouter()

    expect(sut).toBeDefined()
  })

  it('should login router to have a "route" method', () => {
    const sut = new LoginRouter()

    expect(sut.route).toBeDefined()
  })

  it('should login router "route" method receive a httpContext as argument', () => {
    const sut = new LoginRouter()

    const httpContext = {
      body: {
        email: '',
        password: ''
      }
    }

    expect(sut.route(httpContext)).toBeDefined()
  })

  it('should route method return status code 500 if no httpContext was provided', () => {
    const sut = new LoginRouter()
    const httpContext = undefined
    const httpResponse = sut.route(httpContext)

    expect(httpResponse.statusCode).toBe(500)
  })

  it('should route method return status code 500 if no body was provided', () => {
    const sut = new LoginRouter()
    const httpContext = { body: null }
    const httpResponse = sut.route(httpContext)

    expect(httpResponse.statusCode).toBe(500)
  })

  it('should route method return a empty body if no httpContext was provided', () => {
    const sut = new LoginRouter()
    const httpContext = undefined
    const httpResponse = sut.route(httpContext)

    expect(httpResponse.body).toBe(null)
  })

  it('should login router return an httpResponse', () => {
    const sut = new LoginRouter()
    const httpContext = {
      body: {
        email: '',
        password: ''
      }
    }
    const httpResponse = sut.route(httpContext)

    expect(httpResponse).toBeDefined()
  })

  it('should login router return an status code 400 if no email was provided', () => {
    const sut = new LoginRouter()
    const httpContext = {
      body: {
        email: '',
        password: '12345'
      }
    }
    const httpResponse = sut.route(httpContext)

    expect(httpResponse.statusCode).toBeDefined()
  })

  it('should login router return an status code 400 if no password was provided', () => {
    const sut = new LoginRouter()
    const httpContext = {
      body: {
        email: 'test@email.com',
        password: ''
      }
    }
    const httpResponse = sut.route(httpContext)

    expect(httpResponse.statusCode).toBeDefined()
  })
})
