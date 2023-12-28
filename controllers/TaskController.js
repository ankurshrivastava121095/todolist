const TaskModel = require("../models/Task")

class TaskController{

    static add = async(req,res) => {
        try {
            const {userId, title} = req.body

            if (title == '') {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are Required' })
            } else {
                const data = new TaskModel({
                    userId, title
                })
    
                const dataSaved = data.save()
    
                if (dataSaved) {
                    res.status(201).json({ 'status': 'success', 'message': 'Task Added in To Do List'})
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static fetchAll = async(req,res) => {
        try {
            const data = await TaskModel.find({ userId: req.params.id }).sort({ _id: -1 })
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static fetchSingle = async(req,res) => {
        try {
            const data = await TaskModel.findById(req.params.id)
            res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static update = async(req,res) => {
        try {
            const {title} = req.body

            if (title == '') {
                res.status(401).json({ 'status': 'failed', 'message': 'All Fields are Required' })
            } else {     
                const data = await TaskModel.findByIdAndUpdate(req.params.id, {
                    title
                })
    
                if (data) {
                    res.status(201).json({ 'status': 'success', 'message': 'Task Updated'})
                } else {
                    res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
                }
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

    static delete = async(req,res) => {
        try {
            const data = await TaskModel.findByIdAndDelete(req.params.id)

            if (data) {
                res.status(201).json({ 'status': 'success', 'message': 'Task Deleted'})
            } else {
                res.status(401).json({ 'status': 'failed', 'message': 'Internal Server Error' })
            }
        } catch (err) {
            res.status(401).json({ 'status': 'failed', 'message': `Error: ${err}` })
        }
    }

}
module.exports = TaskController