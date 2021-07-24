import request from '@/utils/request'

export function getMemberInfo(id){
    return request({
        url: `/member/members/${id}`,
        method: 'GET'
    })
}

export function getLoginInfo(){
    return request({
        url: "/member/members/info",
        method: 'GET'
    })
}

export function register(data){
    return request({
        url: "/member/members/register",
        method: 'POST',
        data
        // オブジェクトの key がdataで，valueが引数のデータになる，省略の書き方．
    })
}

export function getOpponentInfo(chatId){
    return request({
        url: '/member/members/opponentInfo',
        method: 'GET',
        params: {chatId}
    })
}


