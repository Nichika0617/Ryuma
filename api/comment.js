import request from '@/utils/request'

export function saveComment(data){
    return request({
        url: '/product/comments',
        method: 'post',
        data
    })
}