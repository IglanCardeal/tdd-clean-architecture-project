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

import { Router } from 'express'
const router = Router()

export default () => {
  const signUpController = new SignupController()

  router.post('/', ExpressRouterAdapter.adapt(signUpController))
}

class ExpressRouterAdapter {
  static adapt (signUpRouter) {
    return async (req, res) => {
      const httpContext = {
        body: req.body
      }

      const response = await signUpRouter.route(httpContext)

      res.status(response.status).json(response.body)
    }
  }
}

// Presentation/Controllers/Gateways layer
// arquivo signup-controller.js
export class SignupController {
  async route (httpContext) {
    const { email, password, repeatPassword } = httpContext.body

    const user = new SignupUseCase().signup(email, password, repeatPassword)

    return { status: 201, body: user }
  }
}

// Use-Case (Iteractors) layer
// arquivo signup-usecase
class SignupUseCase {
  constructor (addAccountRepo) {
    this.addAccountRepo = addAccountRepo
  }

  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = new this.AddAccountRepo().createAccount(email, password)

      return user
    }
  }
}

// Infra layer
// arquivo account-repository
import { model } from 'mongoose'
const AccountModel = model('Account')

class AddAccountRepo {
  async createAccount (email, password) {
    const user = await AccountModel.create({ email, password })

    return user
  }
}
