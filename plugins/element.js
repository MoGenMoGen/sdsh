import Vue from 'vue';
import {
  Button,
  Popover,
  Pagination,
  Carousel,
  CarouselItem,
  Input,
  Message,
  Form,
  FormItem
} from 'element-ui';
Vue.use(Popover);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$message = Message;
