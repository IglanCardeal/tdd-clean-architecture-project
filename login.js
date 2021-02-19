// const express = require('express')
// const mongoose = require('mongoose')
// const router = express.Router()
// const AccountModel = mongoose.model('Account')

// module.exports = () => {
//   router.post('/', async (req, res, next) => {
//     const { email, password, repeatPassword } = req.body

//     if (password === repeatPassword) {
//       const user = await AccountModel.create({ email, password })

//       return res.json(user)
//     }

//     return res.status(400).json({ error: 'Passwords is not equal' })
//   })
// }

const express = require('express')
const router = express.Router()

module.exports = () => {
  const signUpRouter = new SignupRouter()

  router.post('/', ExpressRouterAdapter.adapt(signUpRouter))
}

class ExpressRouterAdapter {
  static adapt (signUpRouter) {
    return async (req, res) => {
      const httpContext = {
        body: req.body
      }

      const response = await signUpRouter.route(httpContext)

      res.status(response.status).json(response.user)
    }
  }
}

// Presentation layer
// arquivo signup-router.js
class SignupRouter {
  async route (httpContext) {
    const { email, password, repeatPassword } = httpContext.body

    const user = new SignupUseCase().signup(email, password, repeatPassword)

    return { status: 201, user }
  }
}

// Domain layer
// arquivo signup-usecase
class SignupUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = new AddAccountRepo().createAccount(email, password)

      return user
    }
  }
}

// Infra layer
// arquivo account-repository
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepo {
  async createAccount (email, password) {
    const user = await AccountModel.create({ email, password })

    return user
  }
}
