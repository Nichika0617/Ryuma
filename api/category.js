import request from '@/utils/request'

export function getCategories(){
    return request({
        url: '/product/categories/tree',
        method: 'get',
    })
}