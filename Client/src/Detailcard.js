import React from "react"
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card"
import Media from "react-bootstrap/Media"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CardDeck from "react-bootstrap/CardDeck"
import Container from "react-bootstrap/Container"
import Truncate from 'react-truncate';
import Badge from 'react-bootstrap/Badge'
import { FaCalendar } from 'react-icons/fa'
import { MdShare } from "react-icons/md";
import { GoChevronDown } from "react-icons/go";
import ReadMore from "./ReadMore"
import { FiBookmark } from "react-icons/fi";
import ReactTooltip  from 'react-tooltip'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css, right } from 'glamor';
import { MdBookmark } from "react-icons/md";
import { Tooltip } from "react-bootstrap";
import{EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,FacebookIcon, TwitterIcon,EmailIcon} from "react-share";
import Image from 'react-bootstrap/Image'

class Detailcard extends React.Component{
    constructor(){
        super()
        this.state = {
            bookmarked:false
        }
        this.bookmarkhandle = this.bookmarkhandle.bind(this)
    }
    componentDidMount(){
        try{
            var found =false
            var arr = JSON.parse(localStorage.getItem("bookmark"));
                console.log(arr)
                for(var i=0;i<arr.length;i++){
                    var myobj =JSON.parse(arr[i])
                    if(myobj.articleid==this.props.articleid){
                        found=true
                        break
                    }
                }
                if(found){
                    this.setState({
                        bookmarked:true
                    })
                }
                else{
                    this.setState({
                        bookmarked:false
                    })
                }
        }
        catch(err){
            this.setState({
                bookmarked:false
            })
        }
    }
    bookmarkhandle(){
    
        if(!this.state.bookmarked){
            try{
                var arr = JSON.parse(localStorage.getItem("bookmark"));
                console.log(arr)
                var myobj ={'title':this.props.title,'image':this.props.image,'date':this.props.date,'section':this.props.section,'articleid':this.props.articleid,'news':this.props.news,'shareurl':this.props.shareurl}
                arr.push(JSON.stringify(myobj))
                localStorage.setItem("bookmark", JSON.stringify(arr));
            }
            catch(err){
                var arr = []
                var myobj ={'title':this.props.title,'image':this.props.image,'date':this.props.date,'section':this.props.section,'articleid':this.props.articleid,'news':this.props.news,'shareurl':this.props.shareurl}
                arr.push(JSON.stringify(myobj))
                localStorage.setItem("bookmark", JSON.stringify(arr));
            }
            
            toast(<p lg={true} style={{color:'black !important', fontWeight:'bold !important'}}>Saving {this.props.title}</p>, {
                position: toast.POSITION.TOP_CENTER,
                className: css({
                    background: 'white'
                  }),
                  bodyClassName: css({
                    fontWeight:'bold',
                    filter: 'brightness(100%) !important',
                    color:'black'
                  }),
                
            });
            this.setState(function(prev){
                return {
                    bookmarked:!prev.bookmarked
                }
            })
        }
        else{
            try{
                var arr = JSON.parse(localStorage.getItem("bookmark"));
                console.log(arr)
                var index =-1
                var search= false

                for(var i=0;i<arr.length;i++){
                    var myobj = JSON.parse(arr[i])
                    if(myobj.articleid==this.props.articleid){
                        search = true
                        index=i
                        break
                    }
                }
                if(search){
                    console.log("Found")
                    arr.splice(index,1)
                    localStorage.setItem("bookmark", JSON.stringify(arr));
                    
                }
                toast(<p lg={true} style={{color:'black !important', fontWeight:'bold !important'}}>Removing {this.props.title}</p>, {
                    position: toast.POSITION.TOP_CENTER,
                    className: css({
                        background: 'white'
                      }),
                      bodyClassName: css({
                        fontWeight:'bold',
                        filter: 'brightness(100%) !important',
                        color:'black'
                      }),
                    });
                this.setState(function(prev){
                    return {
                        bookmarked:!prev.bookmarked
                    }
                })

            }
            catch(err){
                this.setState(function(prev){
                    return {
                        bookmarked:false
                    }
                })
            }
            
        }
        

    }
    render(){
        if(!this.state.bookmarked){
            var bookmark_type = <a data-tip="Bookmark" data-place="top"><FiBookmark id="1" style={{display:'inline'}}/> </a>
        }
        else{
            var bookmark_type= <a data-tip="Bookmark" data-place="top"><MdBookmark id="1" style={{display:'inline'}}/></a>
        }
        
        return(
            
                <div>
                    
                        <Card style={{margin:'17px 17px',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.8)', transition: '0.3s' }}>
                            <Card.Title style={{margin:'15px 15px',fontWeight:'bold',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'30px'}}>{this.props.title}</Card.Title>
                            <div>
                            <ReactTooltip place='bottom'/>
                                <Row>
                                    <Col lg={2} xs={5} sm={2} md={2} large={2} xl={2}>
                                        <p style={{display:'inline',marginLeft:'20px',fontFamily:'sans-serif',fontStyle:'italic',fontSize:'15px', fontWeight:'bold', paddingTop:'5px'}}>{this.props.date}</p>
                                    </Col>
                                    <Col lg={9} xs={5} sm={9} md={9} large={9} xl={9}>
                                        <span style={{float:'right' ,paddingTop:'5px'}}>
                                           <a data-tip="Facebook" data-place="top"> <FacebookShareButton children={<FacebookIcon size={35} round />} url={this.props.shareurl} hashtag="#CSCI_571_NewsApp"/> </a>
                                        <a  data-tip="Twitter" data-place="top"> <TwitterShareButton children={<TwitterIcon size={35} round />} url={this.props.shareurl} hashtags={["#CSCI_571_NewsApp"]}/></a>
                                           <a  data-tip="Email" data-place="top"> <EmailShareButton children = {<EmailIcon size={35} round />} url={this.props.shareurl} subject="#CSCI_571_NewsApp"/></a>
                                        </span>
                                    </Col>
                                    <Col lg={1} xs={2} sm={1} md={1} large={1} xl={1}>
                                        <span id="1" style={{float:'right',paddingRight:'20px',color:'red',fontSize:'30px',cursor: "pointer"}} onClick={this.bookmarkhandle}>{bookmark_type}
                                        </span>
                                        <ToastContainer hideProgressBar={true} transition={Zoom}  />
                                    </Col>
                                </Row>
                            </div>
                            
                            <Card.Img variant="top" src={this.props.image} style={{padding:'15px 15px'}}/>
                            <Card.Body>
                                <Card.Text lg={true} style={{margin:'15px 15px',textAlign: 'justify'}}>
                                    <ReadMore text={this.props.description}/>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    
                </div>
           
        )
    }
}
export default Detailcard