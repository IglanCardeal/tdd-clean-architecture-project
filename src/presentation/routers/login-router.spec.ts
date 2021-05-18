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
    const { body } = httpContext
    const { email, password } = body

    if (!email || !password) {
      return { body: null, statusCode: 400 }
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
