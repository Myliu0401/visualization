
import button_icon from '@/assets/image/button_icon.png';
import rotation_icon from '@/assets/image/rotation_icon.png';
import img_icon from '@/assets/image/img_icon.png';
import text_icon from '@/assets/image/text_icon.png';
import weChat_icon from '@/assets/image/weChat_icon.png';
import ifon_icon from '@/assets/image/ifon_icon.png';
import ImgComp from '@/components/imgComp/index.jsx';
import ButtonComp from '@/components/buttonComp/index.jsx';
import TextComp from '@/components/textComp/index.jsx';
import WeChatComp from '@/components/weChatComp/index.jsx';
import RotationComp from '@/components/rotationComp/index.jsx';
import NovelComp from '@/components/novelComp/index.jsx';

const datas = [{
    imgSrc: button_icon,
    text: '按钮',
    component: ButtonComp,
    sidebar: '',
},{
  imgSrc: rotation_icon,
  text: '轮播图',
  component: RotationComp,
  sidebar: '',
},{
  imgSrc: img_icon,
  text: '图片',
  component: ImgComp,
  sidebar: '',
},{
  imgSrc: text_icon,
  text: '文本',
  component: TextComp,
  sidebar: '',
},{
  imgSrc: weChat_icon,
  text: '关注公众号',
  component: WeChatComp,
  sidebar: '',
},{
  imgSrc: ifon_icon,
  text: '小说信息',
  component: NovelComp,
  sidebar: '',
}];


export default datas;