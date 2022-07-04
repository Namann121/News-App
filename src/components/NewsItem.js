import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
        return (
            <div className='my-3'>
                <div className="image-container card">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%' ,zIndex:'1'}}>
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://static.tnn.in/thumb/msid-92496384,imgsize-100,width-1280,height-720,resizemode-75/92496384.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted"><strong>By {!author ? "Anonymous" : author} on
                            {new Date(date).toGMTString()}</strong></small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
