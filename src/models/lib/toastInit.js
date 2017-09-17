export default function*(put,data,succObj,failObj){
    if(data.data.Result == 0){
        yield put({type:"toast/showToast",details:succObj});
    }else{
        yield put({type:"toast/showToast",details:failObj});
    }
}