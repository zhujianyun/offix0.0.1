import { Loading } from 'element-ui';

export default class FetchLoading{
  constructor({target = null}){
    this.instance = null;
    this.target = target;
  }
  start(){
    if(this.target){
      this.instance = Loading.service({
        target: this.target,
        text:'加载中...'
      });
    }
  }
  close(){
    if(this.instance){
      this.instance.close();
    }
  }
}
