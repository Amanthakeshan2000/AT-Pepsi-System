import React, { useState } from 'react'
import { projectRoalOptions } from '@/utils/options'
import { userList } from '@/utils/fackData/userList'
import SelectDropdown from '@/components/shared/SelectDropdown'


const TabProjectAssigned = () => {
    const users = userList(0, 6).map((options) => {
        return { ...options, roles: projectRoalOptions }
    })

    return (
        <section className="step-body mt-4  body current">
            <fieldset>
                <div className="mb-5">
                    <h2 className="fs-16 fw-bold">Project Assagined</h2>
                    <p className="text-muted">If you need more info, please check <a href="#">help center</a></p>
                </div>
                <fieldset>
                    <div className="mb-4">
                        <label htmlFor="inviteTeammates" className="fw-semibold text-dark">Invite Teammates</label>
                        <input type="text" className="form-control" id="inviteTeammates" name="inviteTeammates" placeholder="Add project memnbers by name or email.." />
                    </div>
                    <hr className="my-5" />
                    <div className="mb-4 ">
                        <h6 className="fs-13 fw-semibold pb-3 mb-3 border-bottom">Team Members</h6>
                        {users.map(({ id, roles, user_email, user_img, user_name }, index) =>
                            <Card key={id} email={user_email} img={user_img} name={user_name} roles={roles} index={index} />
                        )}
                    </div>
                    <hr className="my-5" />
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="addingUsers" defaultChecked />
                        <label className="custom-control-label c-pointer" htmlFor="addingUsers">Adding Users by Team Members</label>
                    </div>
                    <div className="fs-12 fw-normal text-muted">If you need more info, please check budget planning</div>
                </fieldset>
            </fieldset>
        </section>

    )
}

export default TabProjectAssigned

const Card = ({ index, img, name, email, roles }) => {
    const roleMapping = ["admin", "guest", "editor", "owner", "customer", "admin"];

    const [selectedOption, setSelectedOption] = useState(null);
    const defaultRole = roles.find(role => role.value === roleMapping[index]);

    return (
        <div className="d-flex align-items-center justify-content-between mb-4 chat-single-item">
            <div className="d-flex align-items-center gap-3">
                {
                    img ?
                        <div className="avatar-image  d-none d-sm-block">
                            <img
                                src={img}
                                className="img-fluid"
                                alt="image"
                            />
                        </div>
                        :
                        <div className="text-white avatar-text user-avatar-text">{name.substring(0, 1)}</div>
                }
                <a href="#" className="w-75">
                    <span className="text-truncate-1-line">{name}</span>
                    <span className="fs-12 fw-normal text-muted text-truncate-1-line">{email}</span>
                </a>
            </div>
            <div className="wd-150">
                {
                    <SelectDropdown
                        options={roles}
                        selectedOption={selectedOption}
                        defaultSelect={defaultRole ? defaultRole.value : ''}
                        onSelectOption={(option) => setSelectedOption(option)}
                    />
                }
            </div>
        </div>
    )
}