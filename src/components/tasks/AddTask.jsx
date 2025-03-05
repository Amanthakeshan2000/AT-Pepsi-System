import React, { useState } from 'react'
import TaskDateRange from './TaskDateRange'
import TaskStatus from './TaskStatus'
import ReactQuill from 'react-quill';
import MultiSelectTags from '@/components/shared/MultiSelectTags'
import MultiSelectImg from '@/components/shared/MultiSelectImg'
import { taskAssigneeOptions, taskLabelsOptions, taskPriorityOptions, taskStatusOptions } from '@/utils/options'

const AddTask = () => {
    const [value, setValue] = useState('');

    return (
        <div className="modal fade" id="addNewTasks" tabIndex="-1">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <label htmlFor="taskName" className="form-label">Name</label>
                            <input type="text" id="taskName" className="form-control" placeholder="Task Name" />
                            <small className="text-muted">Tasks name for your todo</small>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Note/Description</label>
                            <div className="editor task-add">
                                <ReactQuill theme="snow" value={value} onChange={setValue} />
                            </div>
                            <small className="text-muted">Note/Description max 200 charectars</small>
                        </div>
                        <TaskDateRange />
                        <div className='mb-4'></div>
                        <TaskStatus label={"Status:"} options={taskStatusOptions} defaultSelect="inprogress" />
                        <TaskStatus label={"Priority:"} options={taskPriorityOptions} defaultSelect="high" />

                        <div className="form-group mb-4">
                            <label className="form-label">Tags:</label>
                            <MultiSelectTags
                                defaultSelect={[taskLabelsOptions[2]]}
                                options={taskLabelsOptions}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label className="form-label">Assignee:</label>
                            <MultiSelectImg
                                defaultSelect={[taskAssigneeOptions[1]]}
                                options={taskAssigneeOptions}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Add Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTask