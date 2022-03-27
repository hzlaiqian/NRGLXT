import request from '../utils/request';
import {post,get} from '../api/index';


/**
 * 退出
 */
export const logout = () => get('/user/logout');

/**
 * 登陆
 */
export const login = data => post('/user/login', data);
/**
 * 添加标签
 */
export const addLabel = data => post('/label/add', data);
/**
 * 删除标签
 */
export const deleteLabels = data => post('/label/delLabel', data);

/**
 * 查询标签列表
 */
export const getLabelList = data => post('/label/searchLabelList', data);

/**
 * 查询标签列表
 */
export const getLabelListByPID = data => post('/label/getLabelListByPID', data);

/**
 * 查询标签数量
 */
export const getLabelCount = data => get('/label/labelCount')

/**
 * 查询标签
 */
export const searchLabels = data => get('/label/labelList')

/**
 * 查询子级标签
 */
export const getChildLabels = data => post('/label/getChildLabels', data);

/**
 * 根据索引列表查询标签
 */
export const getLabelByList = data => post('/label/getLabelByList', data);

/**
 * 标签树结构
 */
export const getLabelByTree = data => get('/label/getColumnTree', data);

/**
 * 查询二级标签
 */
export const getChildList = data => get('/label/getMoodList', data);

/**
 * 查询用户列表
 */
export const getUserList = data => post('/user/userList', data)

/**
 * 查询用户数量
 */
export const getUserCount = data => get('/user/userCount')

/**
 * 添加用户
 */
export const addUser = data => post('/user/addUser ', data)

/**
 * 更新用户
 */
export const updateUser = data => post('/user/updateUser ', data)

/**
 * 删除用户
 */
export const deleteUser = data => post('/user/delUser ', data)

/**
 * 获取权限列表
 */
export const getAuthorityList = data => get('/authority/getList')

/**
 * 文章录入
 */
export const addArticle = data => post('/article/addArticle', data)

/**
 * 根据ID获取待审核库中的文章
 */
export const getWaitByID = data => post('/check/getCheckByID', data)

/**
 * 根据ID正式库中的文章
 */
export const getCheckByID = data => post('/article/getArticleByID', data)

/**
 * 查询待审核库中的文档数量
 */
export const countArticle = data => post('/article/countArticle',data,'POST')

/**
 * 查询待审核库中的文档数量
 */
export const countUnCheck = data => post('/article/countUnCheck')

/**
 * 获取一个文档开始审核
 */
export const getOneArticle = data => post('/check/getOneCheck',data,'POST')

/**
 * 对一个文章重新打标,参数为文章对象
 */
export const getOnMark = data => post('/check/getOnMark',data,'POST')

/**
 * 对一个文章重新打标,参数为文章ID
 */
export const getOnMarkByID = data => post('/article/getOnMarkByID',data,'POST')

/**
 * 对一个文章重新打标,参数为审核ID
 */
export const getOnMarkByCheckID = data => post('/article/getOnMarkByCheckID',data,'POST')

/**
 * 根据ID过去待审核库中的文档
 */
export const getWaitList = data => post('/check/getWaitList', data)

/**
 * 保存文档
 */
export const addCheck = data => post('/check/addCheck', data)

export const updateCheck = data => post('/check/updateCheck', data)

/**
 * 查询正式库中的文档
 */
export const getCheckList = data => post('/check/getCheckList', data)

/**
 * 删除已上线的文章
 */
export const deleteCheckByID = data => post('/Check/deleteCheckByID', data)

/**
 * 添加理念树节点
 */
export const addIdea = data => post('/idea/add', data)

/**
 * 更新理念树节点
 */
export const updateIdea = data => post('/idea/update', data)

/**
 * 删除理念树节点
 */
export const deleteIdea = data => post('/idea/delete', data)

/**
 * 查询理念树节点
 */
export const getIdea = data => post('/idea/getIdea', data)

/**
 * 根据标签名称查询理念树节点
 */
export const getIdeaByName = data => post('/idea/getIdeaByName', data)

/**
 * 查询理念树列表
 */
export const getIdeaList = data => post('/idea/getList', data)

/**
 * 根据父节点索引查询理念树
 */
export const getListByPID = data => post('/idea/getListByPID', data)

/**
 * 根据索引查询理念树
 */
export const getIdeaByList = data => post('/idea/getIdeaByList', data)


/**
 * 根据理念树节点索引查询概念树列表
 */
export const getConceptByIdea = data => post('/concept/getConceptBeanByIdea', data)

/**
 * 添加概念树节点
 */
export const addConcept = data => post('/concept/add', data)

/**
 * 更新概念树节点
 */
export const updateConcept = data => post('/concept/update', data)

/**
 * 删除概念树节点
 */
export const deleteConcept = data => post('/concept/delete', data)

/**
 * 查询概念树节点
 */
export const getConcept = data => post('/concept/getConcept', data)

/**
 * 根据标签名称查询概念树节点
 */
export const getConceptByName = data => post('/concept/getConceptByName', data)

/**
 * 根据标签名称查询概念树节点
 */
export const getConceptByList = data => post('/concept/getConceptByList', data)

/**
 * 查询概念树列表
 */
export const getConceptList = data => post('/concept/getList', data)

/**
 * 查询概念树列表
 */
export const getConceptTree = data => post('/concept/getConceptTree', data)


export const getIdeaByTree = data => post('/idea/getIdeaByTree', data)

/**
 * 一键排版
 */

export const getArticleLayout = data => post('/check/getArticleLayout', data)
// 查询不通过理由

export const getUnPassList = data => get('/label/getUnPassList', data)
// 查询待审核数量
export const getCountWaitCheck = data => get('/check/countWaitCheck', data)
// 文件上传
export const uploadFile = data => post('/media/uploadfile', data)
// 客户列表查询
export const getUsers = data => get('/mediaConfig/getUsers', data)
// 媒体配置列表
export const getMediaConfigList = data => post('/mediaConfig/getList', data)
// 删除媒体配置
export const deleteMediaConfigList = data => post('/mediaConfig/delete', data)
// 新增媒体配置
export const addMediaConfigList = data => post('/mediaConfig/add', data)
// 修改媒体配置
export const updateMediaConfigList = data => post('/mediaConfig/update', data)
// 根据配置id查询
export const getMediaConfigByID = data => post('/mediaConfig/getMediaConfigByID', data)
// 添加审核维度标签
export const addAuditLabel = data => post('/label/add', data)
// 查询审核维度标签列表
export const getAuditLabelList = data => post('/label/getLabelList', data)
// 删除审核维度标签
export const delAuditLabel = data => post('/label/delLabel', data)
// 根据pid查询标签
export const getAuditLabelListByPID = data => post('/label/getLabelListByPID', data)
