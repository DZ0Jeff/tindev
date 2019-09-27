const Dev = require('../model/Dev')

module.exports = {
    async store(request, response) {
        console.log(request.socket, request.connectedUsers)

        const { devId } = request.params
        const { user } = request.headers 

        const loggedUser = await Dev.findById(user)
        const targetUser = await Dev.findById(devId)

        if(!targetUser){
            return response.status(400).json({ error: 'User not exists'})
        }

        if (targetUser.likes.includes(loggedUser._id)){
            console.log('DEU MATCH!!')

            const loggedSocket = request.connectedUsers[user]
            const targetSocket = request.connectedUsers[devId]

            if(loggedSocket){
                request.socket.to(loggedSocket).emit('match', targetUser)
            }

            if(targetSocket){
                request.socket.to(targetSocket).emit('match', loggedUser)
            }
        }

        loggedUser.likes.push(targetUser._id)

        await loggedUser.save()

        return response.json(loggedUser)
    }
}