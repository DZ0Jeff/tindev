const axios = require('axios')
const Dev = require('../model/Dev')

module.exports = {
    async index(requisition, response){
        const { user } = requisition.headers
        
        const loggedDev = Dev.findById(user)

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return response.json(users)
    },


    async store(req, response){
        console.log(req.body.username);

        const { username } = req.body

        const userExistis = await Dev.findOne({ user: username })

        if (userExistis){
            console.log('Este usuario ja existe!')
            return response.json(userExistis)
        }

        const responseGithub = await axios.get(`https://api.github.com/users/${username}`)
        console.log(responseGithub.data)

        const { name, bio, avatar_url: avatar} = responseGithub.data

        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar: avatar
         })

        return response.json(dev)
    }
}