import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import Img from "../../assets/imgs/carousel.png";

const data=["","",""];
const carousel = function(){
    return(
         <Carousel
            style={{
                  display: "inline-block",
                  width: "100%",
                  height: "auto"
            }}
            autoplay={false}
            infinite
            selectedIndex={0}
            swipeSpeed={35}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
            >
            {data.map(ii => (
                <a href="http://www.baidu.com" key={ii} style={{width:"100%"}}>
                <img
                    src={Img}
                    alt="icon"
                    style={{width:"100%"}}
                />
                </a>
            ))}
        </Carousel>
    );
}

export default carousel;