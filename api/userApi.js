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

export function getOpponentInfo(chatId){
    return request({
        url: '/member/members/opponentInfo',
        method: 'GET',
        params: {chatId}
    })
}


