const Dev = require('../model/Dev')

module.exports = {
    async store(request, response) {

        const { devId } = request.params
        const { user } = request.headers 

        const loggedUser = await Dev.findById(user)
        const targetUser = await Dev.findById(devId)

        if(!targetUser){
            return response.status(400).json({ error: 'User not exists'})
        }

        if (targetUser.likes.includes(loggedUser._id)){
            console.log('VOCÊ NÃO GOSTA DESSA PESSOA???')
        }

        loggedUser.dislikes.push(targetUser._id)

        await loggedUser.save()

        return response.json(loggedUser)
    }
}