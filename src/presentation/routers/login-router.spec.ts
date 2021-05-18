import { LoginRouter, MissingParamError, ServerError } from './login-router'

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
    const httpResponse = sut.route(httpContext as any)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should route method return status code 500 if no body was provided', () => {
    const sut = new LoginRouter()
    const httpContext = { body: null }
    const httpResponse = sut.route(httpContext as any)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('should route method return a instance of ServerError if no httpContext was provided', () => {
    const sut = new LoginRouter()
    const httpContext = undefined
    const httpResponse = sut.route(httpContext as any)

    expect(httpResponse.body).toEqual(new ServerError())
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
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
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
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
