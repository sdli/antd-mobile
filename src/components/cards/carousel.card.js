import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import Img from "../../assets/imgs/carousel.jpg";
import isMobile from "../tools/isMobile";
import React from "react";

const data=["","",""];
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
                {data.map(ii => (
                    <a href="http://www.baidu.com" key={ii} style={{display:"inline-block",width:"100%",height: this.state.height}}>
                        <img
                            src={Img}
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
                    </a>
                ))}
            </Carousel>
        );
    }
}

export default carousel;