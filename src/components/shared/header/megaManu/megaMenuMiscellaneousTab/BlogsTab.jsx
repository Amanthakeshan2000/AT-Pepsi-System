import React from 'react'
import TabFooter from './TabFooter'
import CategoriesSidebar from './CategoriesSidebar'

const BlogsTab = () => {
    return (
        <div className="tab-pane fade" id="v-pills-blogs" role="tabpanel">
            <div className="row g-4">
                <CategoriesSidebar />
                <div className="col-xxl-10">
                    <div className="row g-4">
                        <BlogCard thumbnail={"/images/banner/1.jpg"} title={"Lorem ipsum dolor sit"} />
                        <BlogCard thumbnail={"/images/banner/2.jpg"} title={"Lorem ipsum dolor sit"} />
                        <BlogCard thumbnail={"/images/banner/3.jpg"} title={"Lorem ipsum dolor sit"} />
                        <BlogCard thumbnail={"/images/banner/4.jpg"} title={"Lorem ipsum dolor sit"} />
                        <BlogCard thumbnail={"/images/banner/5.jpg"} title={"Lorem ipsum dolor sit"} />
                        <BlogCard thumbnail={"/images/banner/6.jpg"} title={"Lorem ipsum dolor sit"} />

                        <TabFooter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogsTab

const BlogCard = ({ thumbnail, title, description, date }) => {
    return (
        <div className="col-xxl-4 col-lg-6">
            <div className="d-flex align-items-center gap-3">
                <div className="wd-100 rounded-3">
                    <img src={thumbnail} alt="thumbnail" className="img-fluid rounded-3 border border-3" />
                </div>
                <div>
                    <a href="#">
                        <h6 className="menu-item-heading text-truncate-1-line">{title}</h6>
                    </a>
                    <p className="fs-12 fw-normal text-muted mb-0 text-truncate-2-line">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius dolor quo commodi nisi animi error minus quia aliquam.</p>
                    <span className="fs-11 text-gray-500">26 March, 2023</span>
                </div>
            </div>
        </div>
    )
}