# request-ok 结构

## Activities 

- 登录
- 

### 登录
用户填写表单提交登录，登录成功跳转主页

### 主页
显示用户监听页面的列表
每个页面的历史扫描情况
用户出现
对监听页面用户可以进行编辑或查找

### 查找
在主页搜索栏输入关键字查找记录


## Models
### User
用户个人信息
- name
- pages：用户添加的 pages，User 跟 Page关系多对多

### Page
待扫描页面的信息
- url
- title
- records：record 的列表
- header
- frequency：扫描间隔时间（秒）
- author：修改者
- modify-log：配置信息

### Record
一条扫描记录
- reqSent：发出的请求列表
- reqReceived：收到的请求列表
- startTimeStamp：扫描创建时间
- finishTimeStamp：扫描结束时间
- match：bool，收发请求是否一一对应

### RequestSent
一条发出的请求
- requestId
- url
- header

### RequestReceived
一条收到的请求
- requestId
- status：状态码
- statusText：状态文本
- url：请求的 url
- response-header
- time：请求耗时

### Relation维护用户和页面间多对多关系

