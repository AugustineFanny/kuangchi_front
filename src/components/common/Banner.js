import React from 'react'
import {
  Carousel,
} from 'antd-mobile';
class Banner extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['http://imgsrc.baidu.com/imgad/pic/item/00e93901213fb80e237a4fff3dd12f2eb938946a.jpg',
          'http://img1.imgtn.bdimg.com/it/u=385235256,1947841675&fm=27&gp=0.jpg',
          'http://imgsrc.baidu.com/imgad/pic/item/9f510fb30f2442a73400389fda43ad4bd11302fa.jpg'
        ],
      });
    }, 100);
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="tao_banner">
                 <Carousel
                  autoplay={true}
                  infinite
                  selectedIndex={1}
                  beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                  afterChange={index => console.log('slide to', index)}
                >
                  {this.state.data.map((item,index) => (
                    <a
                      key={index}
                      style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                      <img
                        src={item}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: '176' });
                        }}
                      />
                    </a>
                  ))}
                </Carousel>

                  </div>
    )
  }
}

export default Banner;