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
import { Link } from "react-router-dom";
import{EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,FacebookIcon, TwitterIcon,EmailIcon} from "react-share";
import Modal from "react-bootstrap/Modal"
import Image from 'react-bootstrap/Image'

export default class Searchcard extends React.Component{
    constructor(){
        super()
        this.state={
            truncated:'false',
            openshare:false
        }
        this.handleTruncate = this.handleTruncate.bind(this);
        this.closemodal = this.closemodal.bind(this)
        this.handleshare = this.handleshare.bind(this)
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
    handleTruncate(){
           this.setState({
               truncated:'true'
           })
    }
    render(){
        var color_map ={'world':'#8A2BE2','politics':'#2E8B57','business':'#00BFFF','technology':'#9ACD32','sport':'#FFA500','sports':'#FFA500'}
        var cur_color=""
        if (!(this.props.section in color_map)){
            cur_color = '#808080'
        }
        else{
            cur_color = color_map[this.props.section]
        }
        
        return(
            <div>
                <Link to={{pathname:'/detail',state:{articleid:this.props.detailid}}} style={{textDecoration:'none',color:'black'}}>
                    <Card style={{marginBottom:'10px',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }}>
                            <Card.Body>
                            <Card.Title style={{fontWeight:'bold'}}><Truncate width={430} ellipsis={<span>...</span>}>{this.props.title}</Truncate><MdShare style={{cursor: "pointer"}} onClick={this.handleshare}/></Card.Title>
                                <Image src={this.props.image} style={{paddingBottom:'10px'}} thumbnail  />
                                
                                <Card.Text>
                                    {this.props.date}
                                    <Badge style={{fontSize:'15px',backgroundColor:cur_color,color:'white',float:'right',marginRight:'15px'}}>{this.props.section.toUpperCase()}</Badge>
                                </Card.Text>
                            </Card.Body>
                    </Card>
                </Link>
                <Modal show={this.state.openshare} onHide={this.closemodal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
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