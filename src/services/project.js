import { request, config } from 'utils'

const { api } = config
const { projectMenu, projectList, projectSub, projectInterface, projectDataModal, projectGroup, interfaceDetail, dataModalDetail, BusData, HeadData, AddInterface, AddInterfaceRequest } = api

export async function getMenu(params) {
  return request({
    url: projectMenu,
    method: 'get',
    data: params,
  })
}

export async function getList(params) {
  return request({
    url: projectList,
    method: 'get',
    data: params,
  })
}

export async function getSub(params) {
  return request({
    url: projectSub,
    method: 'get',
    data: params,
  })
}

export async function getInterface(params) {
  return request({
    url: projectInterface,
    method: 'get',
    data: params,
  })
}

export async function getDataModal(params) {
  return request({
    url: projectDataModal,
    method: 'get',
    data: params,
  })
}

export async function getGroup(params) {
  return request({
    url: projectGroup,
    method: 'get',
    data: params,
  })
}

export async function getInterfaceDetail(params) {
  return request({
    url: interfaceDetail,
    method: 'get',
    data: params,
  })
}

export async function getDataModalDetail(params) {
  return request({
    url: dataModalDetail,
    method: 'get',
    data: params,
  })
}

export async function getBusGroup(params) {
  return request({
    url: BusData,
    method: 'get',
    data: params,
  })
}

export async function getHead(params) {
  return request({
    url: HeadData,
    method: 'get',
    data: params,
  })
}

export async function addInterface(params) {
  return request({
    url: AddInterface,
    method: 'POST',
    data: params,
  })
}

export async function addInterfaceRequest(params) {
  return request({
    url: AddInterfaceRequest,
    method: 'POST',
    data: params,
  })
}