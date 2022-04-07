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
export const deleteCheckByID = data => post('/check/deleteCheckByID', data)

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


//===================================    YanM   ==========================================================

/**
 * 推送标准配置读取
 */

export const getCommon = data => get('/pushConfig/getCommon', data)


/**
 * 推送标准配置存储
 */

export const savaCommon = data => post('/pushConfig/savaCommon', data)
/**
 * 新增内容推送
 */

export const pushAdd = data => post('/push/add', data)

/**
 * 编辑内容推送
 */

export const getPushByID = data => post('/push/getPushByID', data)
/**
 * 推送详情查看
 */

export const getProcessByID = data => post('/pushAction/getProcessByID', data)

/**
 * 推送详情查看
 */

export const getProcessByID2 = data => get('/push/getProcessByID', data)

/**
 * 推送后台列表
 */

export const getPushList = data => post('/push/getPushList', data)

/**
 * 推送数据报表(app推送或app弹窗推送详细数据)
 */
export const getCount = data => post('/push/getCount', data)
/**
 *  推送数据报表(短信推送详细数据)
 */
export const getCountByMsg = data => post('/push/getCountByMsg', data)
/**
 * 推送列表统计
 */
export const getPushCount = data => get('/push/getPushCount', data)


/**
 * 精推策略配置清单
 */
export const getStrategyList = data => get('/precise/getPreciseList', data)
/**
 * 精推策略配置清单
 */
export const getRuleByID = data => get('/push/getRuleByID', data)
/**
 * 推送效果数据-日均打开率
 */
export const getClickRate = data => post('/precise/getOpenRate', data)
/**
 * 推送效果数据-人均停留时间
 */
export const getKeepRate = data => post('/precise/getKeepRate', data)
/**
 * 获取推送审核页面详情-H5
 */
export const checkPushH5 = data => get('/push/getCheckPush', data)
/**
 * 提交推送审核-H5
 */
export const submitPushH5 = data => post('/push/saveCheckPush', data)
/**
 * 用户组列表
 */
export const getPushUserList = data => get('/push/getPushUserList', data)

/**
 * 精准推送配置 规则标签分类
 */

export const getRootList = data => get('/idea/getRootList', data)
/**
 * 精准推送配置 规则标签
 */

export const getListByRootIdeaID = data => post('/concept/getListByRootIdeaID', data)
/**
 * 精推策略配置 根据策略查询规则

 */

export const getPreciseByID = data => post('/precise/getPreciseByID', data)
/**
 * 精推策略配置  保存配置
 */

export const savePrecise = data => post('/precise/save', data)
/**
 * 精准策略配置 新增

 */

export const addPrecise = data => post('/precise/add', data)
/**
 * 精准策略配置 删除

 */

export const deleteByID = data => post('/precise/deleteByID', data)

/**
 * 根据URL提取文章信息

 */

export const getCheckByUrl = data => post('/push/getCheckByUrl', data)

/**
 * 删除推送内容


 */

export const deleteByIDPush = data => post('/push/deleteByID', data)

/**
 * 全部推送页面顶部数据
 */

export const allPushDataTop = data => get('/pushStat/allPushStat/top', data)

/**
 * 历史推送数据总量折线图
 */

export const allHisLineData = data => get('/pushStat/allPushStat/total', data)

/**
 * 历史推送用户分布折线图
 */

export const userHisLineData = data => get('/pushStat/allPushStat/user', data)

/**
 * 历史点击用户折线图
 */

export const clickHisLineData = data => get('/pushStat/allPushStat/userClick', data)

/**
 * app推送顶部数据
 */

export const getAppPushTopData = data => get('/pushStat/appPushStat/top', data)

/**
 * app推送统计历史推送量和历史点击率
 */

export const getHisAndClick = data => get('/pushStat/appPushStat/countAndRate', data)

/**
 * app推送统计 历史推送用户数和点击数
 */

export const getHisUserAndClick = data => get('/pushStat/appPushStat/userCountAndRate', data)

/**
 * app推送统计 历史热点推送点击率和固定推送点击率
 */

export const getHotClickAndGu = data => get('/pushStat/appPushStat/pushType', data)

/**
 * app推送统计 用户组区分
 */

export const getUserGroup = data => get('/pushStat/appPushStat/userGroup', data)

/**
 * 短信推送顶部数据
 */

export const getMsgTopData = data => get('/pushStat//smsPushStat/top', data)

/**
 * 短信推送图表数据
 */


export const getMsgPushData = data => get(' /pushStat//smsPushStat/data', data)

/**
 * 根据url查询文章信息
 *
 */

export const queryArticle = data => post('/article/queryArticle', data)
/**
 *
 * 上传文件接口,传入filename,uploadType传入1
 */
export const uploadfile = data => post('/media/uploadfile', data)

/**
 *
 * 增加运营信息
 */
export const addOperateInfo = data => post('/operate/addOperateInfo', data)


/**
 *
 * 查询文章信息带分页
 */
export const queryRecom = data => post('/article/queryRecom', data)
/**
 *
 * 删除运营信息,只需传入checkId
 */
export const delOperate = data => post('/operate/delOperate', data)
/**
 *
 * 查询焦点或者要闻图,只需要传type即可
 */
export const queryFocusNews = data => post('/operate/queryFocusNews', data)


/**
 *
 * 修改,删除焦点或者要闻图
 */
export const changeFocusNews = data => post('/operate/changeFocusNews', data)


/**
 * app推送，app弹窗推送表格获取
 */

export const getAppOrBoxTable = data => post('/operate/queryClickRate', data)

/**
 * 短信推送表格获取
 */

export const getMsgTable = data => post('/operate/queryUnsubscribeRate', data)


//===================================    YanM   ==========================================================
