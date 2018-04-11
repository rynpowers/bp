import React from 'react';
import DashBoardPostLayout from './DashBoardPostLayout.jsx';


class DashBoardStatus extends React.Component{
    
    state = {
        getStatus: []
    }
    
    static getDerivedFromStateProps(nextProps, prevProps){
                
    }
    
    componentDidMount(){
      fetch('status', { method: 'GET', credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
               getStatus: res
            })
        }).catch(err => err);
    }

    render(){
        const { status, commentVal, handleOnChange, handKeyDown, comment } = this.props;
        const { getStatus } = this.state;
        const updates = getStatus && getStatus.length ? 
            getStatus.map((cStatus, index) => {
                return (
                <div className="dashboard-post">
                    <div className="post-details">
                        <div className="post-image-wrapper">
                        { cStatus.post_img.length === 1 ?
                            <div className="post-image" style={{backgroundImage: `url(${cStatus.post_img[0]})`}}></div>  
                                :
                            cStatus.post_img.map((i, index) => {
                                console.log(index)
                                if(index > 2){
                                    return (
                                        <div className="post-image-more">
                                            <h4> Show more </h4>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="post-image-small" style={{backgroundImage: `url(${i})`}}></div>
                                )
                            })
                        }
                        </div>
                        <div className="post-status-wrapper">
                            <p> {cStatus.post_description} </p>
                        </div>
                        <div className="post-reactions-wrapper">
                            <div className="reactions-head">
                                <span id="post-tag"> League </span>
                                <span className="right" id="post-init-react"> React </span>
                            </div>
                            <div className="reactions-list">
                                <div className="a-reaction"></div>
                                <div className="a-reaction"></div>
                            </div>
                        </div>
                        <div className="post-commentBox-wrapper">
                            <div className="post-comment-box">
                                <div className="user-image">
                                </div>
                                <textarea onChange={handleOnChange} onKeyDown={handKeyDown} 
                                    className="main-comment-box" type="text" 
                                    placeholder="Say something about this human..."
                                    ref={comment}
                                    value={commentVal}
                                />
                            </div>
                        </div>
                    </div>
                </div>  
                )
            }) : <DashBoardPostLayout/>
        return (
           <div>
            {updates}
           </div>
        )
    }
}


export default DashBoardStatus;