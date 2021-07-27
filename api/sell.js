import request from '@/utils/request'
// putup => 出品
export function putup(data){
    return request({
        url: '/product/products',
        method: 'POST',
        data
    })
}
