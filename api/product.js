import request from '@/utils/request'

export function listProductsByCategoryId(params){
    return request({
        url: '/product/products',
        method: 'get',
        params,
    })
}

export function getIndexData(params){
    return request({
        url: '/product/products/index',
        method: 'get',
        params
    })
}

export function getProduct(id){
    return request({
        url: `/product/products/${id}`,
        method: 'get',
    })
}