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
import { IoMdTrash } from "react-icons/io";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { css } from 'glamor';
import{EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,FacebookIcon, TwitterIcon,EmailIcon} from "react-share";
import Modal from "react-bootstrap/Modal"
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

export default class Bookmarkcard extends React.Component{
    constructor(){
        super()
        this.state={
            truncated:'false',
            openshare:false
        }
        this.handleTruncate = this.handleTruncate.bind(this);
        this.handle = this.handle.bind(this)
        this.callback = this.callback.bind(this)
        this.closemodal = this.closemodal.bind(this)
        this.handleshare = this.handleshare.bind(this)
    }
    handleTruncate(){
           this.setState({
               truncated:'true'
           })
    }
    callback(){
        this.props.action(this.props.articleid)
    }
    closemodal(){
        this.setState({
            openshare:false
        })
    }
    handleshare(e){
        e.preventDefault();
        this.setState({
            openshare:true
        })
    }
    handle(e){
        e.preventDefault();
        toast(<p lg={true}style={{color:'black !important', fontWeight:'bold !important'}}>Removing {this.props.title}</p>, {
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
        setTimeout(this.callback, 1200);
        
    }
    render(){
        var cur_color=""
        console.log(this.props.section)
        if(this.props.section.toLowerCase()=='world'){
            cur_color = '#8A2BE2'
        }
        else if(this.props.section.toLowerCase()=='politics'){
            cur_color= '#2E8B57'
        }
        else if(this.props.section.toLowerCase()=='business'){
            cur_color = '#00BFFF'
        }
        else if(this.props.section.toLowerCase()=='technology'){
            cur_color = '#9ACD32'
        }
        else if(this.props.section.toLowerCase()=='sport' || this.props.section.toLowerCase()=='sports'){
            cur_color = '#FFA500'
        }
        else{
            cur_color ="#808080"
        }
        if(this.props.news=="Guardian"){
            var news_color = "#191970"
            var textcolor = "white"
        }
        else{
            var news_color = "#E0E0E0"
            var textcolor = "black"
        }
        return(
            <div>
                <Link to={{pathname:'/detail',state:{articleid:this.props.articleid}}} style={{textDecoration:'none',color:'black'}}>
                <Card style={{marginBottom:'10px',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
                        <Card.Body>
                        <Card.Title style={{fontWeight:'bold'}}><Truncate width={430} ellipsis={<span>...</span>}>{this.props.title}</Truncate><MdShare onClick={this.handleshare}/><IoMdTrash id={this.props.articleid} onClick={this.handle}/></Card.Title>
                        <ToastContainer hideProgressBar={true} transition={Zoom}  />
                        <Image src={this.props.image} style={{paddingBottom:'10px'}} thumbnail  />  
                        
                            <Card.Text>
                                {this.props.date}
                                <span style = {{float:'right'}}>
                                <Badge style={{fontSize:'12px',backgroundColor:cur_color,color:'white',marginRight:'13px'}}>{this.props.section.toUpperCase()}</Badge>
                                <Badge style={{fontSize:'12px',backgroundColor:news_color,color:textcolor,marginRight:'13px'}}>{this.props.news.toUpperCase()}</Badge>
                                </span>
                            </Card.Text>
                        </Card.Body>
                </Card>
                </Link>
                <Modal show={this.state.openshare} onHide={this.closemodal}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontWeight:'bold'}}>
                            <p>{this.props.news}</p>
                            {this.props.title}
                            </Modal.Title>
                        </Modal.Header>

                    <Modal.Body>
                        <p style={{textAlign:'center', fontWeight:'bold'}}>Share via</p>
                        <Row style={{textAlign:'center'}}>
                            <Col lg={4} xs={4} sm={4} md={4} large={4} xl={4}>
                            <FacebookShareButton children={<FacebookIcon round/>} url={this.props.shareurl} hashtag="#CSCI_571_NewsApp"/>
                            </Col>
                            <Col lg={4} xs={4} sm={4} md={4} large={4} xl={4}>
                                <TwitterShareButton children={<TwitterIcon round/>} url={this.props.shareurl} hashtags={["#CSCI_571_NewsApp"]}/>
                            </Col>
                            <Col lg={4} xs={4} sm={4} md={4} large={4} xl={4}>
                                <EmailShareButton children = {<EmailIcon round/>} url={this.props.shareurl} subject="#CSCI_571_NewsApp"/>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}