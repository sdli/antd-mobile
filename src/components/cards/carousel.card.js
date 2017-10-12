import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import Img from "../../assets/imgs/carousel.jpg";
import isMobile from "../tools/isMobile";
import {Link} from "react-router";
import React from "react";

const data=[
    {
        url:"http://image-edu.oss-cn-beijing.aliyuncs.com/banner/jf.jpg",
        link: "50000"
    },
    {
        url:"http://image-edu.oss-cn-beijing.aliyuncs.com/banner/jxgy.jpg",
        link:"50005"
    },{
        url:"http://image-edu.oss-cn-beijing.aliyuncs.com/banner/sd.jpg",
        link:"50001"
    },
    {
        url:"http://image-edu.oss-cn-beijing.aliyuncs.com/banner/xlga.jpg",
        link:"50002"  
    }
];
class carousel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            height: 0
        }
    }

    componentWillReceiveProps(){
        const width = window.screen.availWidth;
        const height = width/900*400*isMobile;
        this.setState({
            height: height
        });
        console.log(height);
    }

    render(){
        return(
            <Carousel
                style={{
                    width: "100%",
                    height: this.state.height,
                }}
                autoplay={false}
                infinite
                selectedIndex={0}
                swipeSpeed={35}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {data.map((ii,index) => (
                    <Link to={{pathname:"/lessionList",query:{CourseId:ii.link}}} key={"banner"+index} style={{display:"inline-block",width:"100%",height: this.state.height}}>
                        <img
                            src={ii.url}
                            alt="icon"
                            style={{width:"100%",verticalAlign: "top"}}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    height: null,
                                });
                            }}
                        />
                    </Link>
                ))}
            </Carousel>
        );
    }
}

export default carousel;